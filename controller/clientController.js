const { hashSync, genSaltSync, compare } = require("bcrypt")
const { StatusCodes } = require(`http-status-codes`)
const models = require("../models")
const nodemailer = require('nodemailer');
const { sign } = require("jsonwebtoken");
const jwt_decode = require('jwt-decode');
const { sendDebugInResponse } = require("../models/apiModel");
const { newOrderSchema } = models.orderModel
const validationEmailChangeCredentials = models.userModel.validationEmailChangeCredentials

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'proiecttwpss@gmail.com',
        pass: 'proiecttv'
    }
});

var mailOptions = {
    from: 'curier@gmail.com',
    to: '',
    subject: '',
    text: ''
};

module.exports = {

    getCost: (req, res) => {
        console.log(req.body);
        return res.json({ message: res.body });
    },
    placeOrder: (req, res) => {

        const body = req.body
        if (!body)
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: `no body provided for neworder`
            })
        const { error, value } = newOrderSchema.validate(body);
        if (error) {
            console.log(error.message)
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: error.message
            })
        }
        console.log(body);
        req.db.placeNewOrder(body, (error, results) => {
            if (error) {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    ...sendDebugInResponse && { error: error.message }
                })
            } else {
                const result = Object.values(JSON.parse(JSON.stringify(results)))
                req.body.awb = result[0]['LAST_INSERT_ID()'];
                req.body.id = req.accountId;
                req.db.insertIntoAwbEvents(req.body, (error, results) => {
                    if (error) {
                        res.status(500).json({
                            success: false,
                            ...sendDebugInResponse && { error: error.message }
                        })
                    } else {
                        if (req.accountType != null) {
                            req.db.insertIntoClientOrders(body, (error, results) => {
                                if (error) {
                                    console.log(error.message);
                                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                                        success: false,
                                        ...sendDebugInResponse && { error: error.message }
                                    })
                                } else {
                                    console.log("aoco");
                                    mailOptions.to = body.email_sender
                                    mailOptions.subject = `Comanda cu numarul ${req.body.awb} plasată cu succes`
                                    mailOptions.text = `Link RSS: http://parcel-shipping-simulator.herokuapp.com/api/rssFeed?awb=${req.body.awb} \nExpeditor: ${req.body.fullName_sender} \nTelefon: ${req.body.phone_sender}\nEmail: ${req.body.email_sender}\nJudet: ${req.body.county_sender}\nLocalitate: ${req.body.city_sender}\nAdresă: ${req.body.address_sender} \n\nDestinatar:${req.body.fullName_receiver}\nTelefon: ${req.body.phone_receiver}\nJudet: ${req.body.county_receiver}\nLocalitate: ${req.body.city_receiver}\nAdresă: ${req.body.address_receiver}\n\n Vă mulțumim pentru comandă!\n Un curier va lua legătura cu dvs în scurt timp. `
                                    transporter.sendMail(mailOptions, function(error, info) {
                                        if (error) {
                                            console.log(error.message);
                                        } else {
                                            console.log('Email sent: ' + info.response);
                                        }
                                    });
                                    res.status(200).json({
                                        success: true
                                    })
                                }
                            })
                        } else {
                            mailOptions.to = body.email_sender
                            mailOptions.subject = `Comanda cu numarul ${req.body.awb} plasată cu succes`
                            mailOptions.text = `Link RSS: http://parcel-shipping-simulator.herokuapp.com/api/rssFeed?awb=${req.body.awb} \nExpeditor: ${req.body.fullName_sender} \nTelefon: ${req.body.phone_sender}\nEmail: ${req.body.email_sender}\nJudet: ${req.body.county_sender}\nLocalitate: ${req.body.city_sender}\nAdresă: ${req.body.address_sender} \n\nDestinatar:${req.body.fullName_receiver}\nTelefon: ${req.body.phone_receiver}\nJudet: ${req.body.county_receiver}\nLocalitate: ${req.body.city_receiver}\nAdresă: ${req.body.address_receiver}\n\n Vă mulțumim pentru comandă!\n Un curier va lua legătura cu dvs în scurt timp. `
                            transporter.sendMail(mailOptions, function(error, info) {
                                if (error) {
                                    console.log(error.message);
                                } else {
                                    console.log('Email sent: ' + info.response);
                                }
                            });
                            res.status(200).json({
                                success: true
                            })
                        }
                    }
                })

            }
        })
    },
    codeChange: (req, res) => {
        const body = req.body
        const { error, value } = validationEmailChangeCredentials.validate(body)
        if (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: error.message
            })
        }
        req.db.getUserByEmail(body.email, (error, results) => {
            if (error) {
                res.status(500).json({
                    success: false,
                    ...sendDebugInResponse && { error: error.message }
                })
            } else if (results != undefined) {
                var id = results.id
                data = {
                    id: id,
                    type: body.type
                }
                req.db.newCode(data, (error, results) => {
                    if (error) {
                        res.status(500).json({
                            success: false,
                            ...sendDebugInResponse && { error: error.message }
                        })
                    } else {
                        console.log(results)
                        console.log(id)
                        mailOptions.to = body.email
                        mailOptions.subject = 'Schimbarea datelor'
                        mailOptions.text = 'Codul pentru resetare este:\n' + results.insertId
                        console.log(`reset code`, results.insertId)
                        transporter.sendMail(mailOptions, function(error, info) {
                            if (error) {
                                console.log(error.message);
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                        });
                        const data = {
                            id: id,
                            code: results.insertId,
                            type: body.type
                        }
                        req.db.deleteCode(data, (error, results) => {
                            if (error) {
                                res.status(500).json({
                                    success: false,
                                    ...sendDebugInResponse && { error: error.message }
                                })
                            } else {
                                res.status(200).json({
                                    success: true
                                })
                            }
                        })
                    }
                })
            } else {
                res.status(200).json({
                    success: false,
                    error: "not exist"
                })
            }
        })
        return res;
    },
    change: (req, res) => {
        const body = req.body
        console.log(body)
        req.db.selectIdChange(body, (error, results) => {
            if (error) {
                res.status(500).json({
                    success: false,
                    ...sendDebugInResponse && { error: error.message }
                })
            } else if (results != undefined) {
                body.id = results.id
                var id = results.id
                if (body.type == "password") {
                    const salt = genSaltSync(10)
                    body.password = hashSync(body.password, salt)
                    req.db.changePassword(body, (error, results) => {
                        if (error) {
                            res.status(500).json({
                                success: false,
                                ...sendDebugInResponse && { error: error.message }
                            })
                        } else {
                            const data = {
                                id: id,
                                code: 0,
                                type: body.type
                            }
                            req.db.deleteCode(data, (error, results) => {
                                if (error) {
                                    res.status(500).json({
                                        success: false,
                                        ...sendDebugInResponse && { error: error.message }
                                    })
                                } else {
                                    res.status(200).json({
                                        success: true
                                    })
                                }
                            })
                        }
                    })
                } else if (body.type == "email") {
                    req.db.changeEmail(body, (error, results) => {
                        if (error) {
                            console.log(error.message)
                            res.status(500).json({
                                success: false,
                                ...sendDebugInResponse && { error: error.message }
                            })
                        } else {
                            const data = {
                                id: id,
                                code: 0,
                                type: body.type
                            }
                            req.db.deleteCode(data, (error, results) => {
                                if (error) {
                                    res.status(500).json({
                                        success: false,
                                        ...sendDebugInResponse && { error: error.message }
                                    })
                                } else {
                                    res.status(200).json({
                                        success: true
                                    })
                                }
                            })
                        }
                    })
                }
            } else {
                res.status(200).json({
                    success: false,
                    error: "not exist"
                })
            }
        })
        return res
    },
    autoComplete: (req, res) => {
        const body = req.body;
        const token = req.headers.cookie.split('=')[1];
        var decoded = jwt_decode(token);
        const email = decoded.results.email;
        req.db.getUserByEmail(email, (err, results) => {
            if (err) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    err: err.message
                })
            } else res.status(StatusCodes.OK).json({
                success: true,
                data: results
            })
        })
    }
}
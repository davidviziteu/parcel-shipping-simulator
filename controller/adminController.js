const { StatusCodes } = require(`http-status-codes`)
const models = require("../models")
const nodemailer = require('nodemailer');
const { hashSync, genSaltSync, compareSync } = require("bcrypt")


module.exports = {
    addNotification: (req, res) => {
        if (!req.body)
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: `missing body`
            })

        const { error, value } = models.notifcationModel.newNotificationSchema.validate(req.body)
        if (error)
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: error
            })
        req.db.addNotification(req.body, (err, results) => {
            if (err) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    err: err.message
                })
            } else res.status(StatusCodes.OK).json({
                success: 1,
                data: "notificarea a fost adaugata cu succes!"
            })
        })

    },
    createAccount: (req, res) => {
        const body = req.body
        const salt = genSaltSync(10)
        body.password = hashSync(body.password, salt)
        const { error, value } = models.adminModel.newEmployeeSchema.validate(body);
        if (error) {
            return res.status(300).json({
                success: false,
                error: error.message
            })
        }
        req.db.createAccount(body, (error, results) => {
            if (error) {
                res.status(200).json({
                    success: false,
                    error: error.message
                })
            } else {
                res.status(200).json({
                    success: true
                })
                /* mailOptions.to = body.email
                mailOptions.subject = 'Confirmare creare cont'
                mailOptions.text = 'Ți-ai creat cont cu succes!'
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error.message);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                }); */
            }
        })
        return res
    },
    getInfoUser: (req, res) => {
        body = req.parameters
        const { error, value } = models.adminModel.validationEmail.validate(body)
        if (error) {
            return res.status(200).json({
                success: false,
                error: error.message
            })
        }
        req.db.getUserByEmail(body.email, (error, results) => {
            if (error) {
                res.status(200).json({
                    success: false,
                    error: error.message
                })
            }
            else if (results != undefined) {
                res.status(200).json({
                    success: true,
                    surname: results.surname,
                    name: results.name,
                    phone: results.phone
                })
            }
            else {
                res.status(200).json({
                    success: false
                })
            }
        })
        return res
    },
    deleteAccount: (req, res) => {
        body = req.body
        const { error, value } = models.adminModel.validationEmail.validate(body)
        if (error) {
            return res.status(200).json({
                success: false,
                error: error.message
            })
        }
        req.db.getUserByEmail(body.email, (error, results) => {
            if (error) {
                res.status(200).json({
                    success: false,
                    error: error.message
                })
            }
            else if (results != undefined) {
                req.db.deleteAccount(body.email, (error, results) => {
                    if (error) {
                        res.status(200).json({
                            success: false,
                            error: error.message
                        })
                    }
                    else {
                        res.status(200).json({
                            success: true
                        })
                    }
                })
            }
            else {
                res.status(200).json({
                    success: false,
                    error: "not exist"
                })
            }
        })
        return res
    }
}
const { StatusCodes } = require(`http-status-codes`)
const models = require("../models")
const nodemailer = require('nodemailer');
const { hashSync, genSaltSync, compareSync } = require("bcrypt")


module.exports = {
    modifyCar: (req, res) => {
        if (req.accountType != `admin`)
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                error: "doar adminul poate executa aceasta comanda!"

            })
        if (!req.body)
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: `missing body`
            })
        const { error, value } = models.carModel.modifyCarSchema.validate(req.body)
        if (error)
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: error.message
            })
        if (req.body.status == `Adaugă`) {
            req.db.addCar(req.body, (err, results) => {
                if (err) {
                    res.status(StatusCodes.BAD_REQUEST).json({
                        success: false,
                        err: err.message
                    })
                } else res.status(StatusCodes.OK).json({
                    success: true,
                    data: "masina a fost adaugata cu succes!"
                })
            })
        } else {
            req.db.modifyCar(req.body, (err, results) => {
                if (err) {
                    res.status(StatusCodes.BAD_REQUEST).json({
                        success: false,
                        err: err.message
                    })
                } else res.status(StatusCodes.OK).json({
                    success: true,
                    data: "masina a fost modificata cu succes!"
                })
            })
        }
        return res
    },
    addNotification: (req, res) => {
        if (req.accountType != `admin`)
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                error: "doar adminul poate executa aceasta comanda!"

            })
        if (!req.body)
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: `missing body`
            })

        const { error, value } = models.notificationModel.newNotificationSchema.validate(req.body)
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
                success: true,
                data: "notificarea a fost adaugata cu succes!"
            })
        })

    },
    deleteNotification: (req, res) => {

        if (req.accountType == `admin`) {
            if (!req.body)
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    error: `missing body`
                })
            console.log(req.body)
            const { error, value } = models.notificationModel.deleteNotificationSchema.validate(req.body)
            if (error)
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    error: error
                })
            req.db.deleteNotification(req.body.id, (err, results) => {
                if (err) {
                    res.status(StatusCodes.BAD_REQUEST).json({
                        success: false,
                        err: err.message
                    })
                } else res.status(StatusCodes.OK).json({
                    success: true,
                    message: "notificarea a fost stearsa cu succes!"
                })
            })
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({
                success: 0,
                error: "doar adminul poate executa aceasta comanda!"
            })
        }
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
                    id: results.id,
                    surname: results.surname,
                    name: results.name,
                    phone: results.phone
                })
            }
            else {
                res.status(StatusCodes.NOT_FOUND).json({
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
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: error.message
            })
        }
        req.db.getUserByEmail(body.email, (error, results) => {
            if (error) {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    error: error.message
                })
            }
            else if (results != undefined) {
                req.db.deleteAccount(body.email, (error, results) => {
                    if (error) {
                        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
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
                res.status(StatusCodes.NOT_FOUND).json({
                    success: false,
                    error: "not exist"
                })
            }
        })
        return res
    }
}
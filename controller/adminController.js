const { StatusCodes } = require(`http-status-codes`)
const models = require("../models")
const nodemailer = require('nodemailer');
const { hashSync, genSaltSync, compareSync } = require("bcrypt")

const newAccountSchema = models.newEmployeeSchema

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
        const { error, value } = newAccountSchema.validate(body);
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
    }
}
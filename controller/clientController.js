const { hashSync, genSaltSync } = require("bcrypt")
const { StatusCodes } = require(`http-status-codes`)
const models = require("../models")
const Joi = require('joi')
const nodemailer = require('nodemailer');

const newUserSchema = models.userModel.newUserSchema
const newOrderSchema = models.newOrderModel

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'proiecttwpss@gmail.com',
        pass: 'proiecttv'
    }
});

var mailOptions = {
    from: 'proiecttwpss@gmail.com',
    to: '',
    subject: 'Sending Email using Node.js',
    text: 'Ți-ai creat cont cu succes!'
};

module.exports = {
    createAccountUser: (req, res) => {
        const body = req.body
        const salt = genSaltSync(10)
        body.password = hashSync(body.password, salt)
        const { error, value } = newUserSchema.validate(body);
        if (error) {
            return res.status(300).json({
                success: false,
                error: error.message
            })
        }
        req.db.createAccount(body, (error, results) => {
            if (error) {
                res.status(500).json({
                    success: false,
                    error: error.message
                })
            }
            else {
                res.status(200).json({
                    success: true
                })
                mailOptions.to = body.email
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error.message);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
            }
        })
        return res
    },
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
            return res.status(300).json({
                success: false,
                error: error.message
            })
        }
        console.log(body);
        req.db.placeNewOrder(body, (error, results) => {
            if (error) {
                res.status(500).json({
                    success: false,
                    error: error.message
                })
            }
            else res.status(200).json({
                success: true
            })
        })
        return res
    }
}

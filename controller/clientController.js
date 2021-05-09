const { hashSync, genSaltSync } = require("bcrypt")

const newUserSchema = require("../models/validationRegister")
const newOrderSchema = require("../models/validationNewOrder")
const Joi = require('joi')

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
            else res.status(200).json({
                success: true
            })
            res.end()
        })
        res.endNow = false
        return res
    },
    getCost: (req, res) => {
        console.log(req.body);
        return res.json({ message: res.body });
    },
    placeOrder: (req, res) => {
        const { error, value } = newOrderSchema.validate(req.body);
        if (error) {
            console.log(error.message)
            return res.status(300).json({
                success: false,
                error: error.message
            })
        }
        console.log(req.body);
        return res.json({ message: res.body });
    }
}

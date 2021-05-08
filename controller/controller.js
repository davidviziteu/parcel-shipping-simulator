const {
    createAccount
} = require('../models/model')

const { hashSync, genSaltSync } = require("bcrypt")

const { newUserSchema } = require("../models/validationRegister")

module.exports = {
    createAccountUser: (req, res) => {
        const body = req.body
        const salt = genSaltSync(10)
        body.password = hashSync(body.password, salt)
        /* const { error, value } = Joi.validate(body, newUserSchema);
        if (error) {
            return res.status(300).json({
                success: false,
                error
            })
        } */
        createAccount(body, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: false
                })
            }
            return res.status(200).json({
                success: true
            })
        })
    }
}

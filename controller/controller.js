const {
    createAccount
} = require('../models/model')

const { hashSync, genSaltSync } = require("bcrypt")

const { newUserSchema } = require("../models/validationRegister")

module.exports = {
    createAccountUser: (req, res) => {
        const body = req
        const salt = genSaltSync(10)
        body.password = hashSync(body.password, salt)
        const { error, value } = Joi.validate(body, newUserSchema);
        if (error) {

        }
        createAccount(data, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: 0
                })
            }
            return res.status(200).json({
                success: 1
            })
        })
    }
}

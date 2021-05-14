const models = require(`../models`)
const { sign } = require("jsonwebtoken");
const { StatusCodes } = require(`http-status-codes`)
const { hashSync, genSaltSync, compare } = require("bcrypt");
module.exports = {
    getAWB: (req, res) => {
        console.log(req.body)
        if (req.body.AWB) {
            if (dbAWB.find(function(arg) {
                    return arg == req.body.AWB;
                }))
                return res.status(200).json({
                    "succes": true
                })
            else return res.status(200).json({
                "succes": false
            })
        }
        return res.status(400).json({
            error: `Missing 'AWB' filed from request`
        })
    },

    handleLogin: (req, res) => {
        if (!req.body)
            return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    error: `no body provided for login`
                })
                // const salt = genSaltSync(10);
                // req.body.password = hashSync(req.body.password, salt);
        console.log(req.body)
        const { error, value } = models.userModel.loginUserSchema.validate(req.body)
        if (error)
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: error.message
            })
        const email = req.body.email;
        req.db.getUserByEmail(email, (err, results) => {
            if (err) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    error: error.message
                })
            } else
            if (!results) {
                return res.json({
                    success: 0,
                    data: "No user with that email!"
                });
            } else {
                const result = compare(req.body.password, results.password);
                if (result) {
                    results.password = undefined;
                    const jsontoken = sign({ results }, process.env.secretKey, {
                        expiresIn: "1h"
                    });
                    res.setHeader('Set-Cookie', 'token=' + jsontoken + '; HttpOnly;Secure;expires=Wed, 21 Oct 2030 07:28:00 GMT;Max-Age=9000000;Domain=localhost;Path=/');
                    console.log(`cookie set`)
                    return res.json({
                        success: true,
                        redirect: `/dashboard-${results.type}.html`
                    });

                } else {
                    return res.json({
                        success: 0,
                        data: "Invalid password!"
                    });
                }
            }
            // return res.status(StatusCodes.ACCEPTED).json({
            //     success: true,
            //     message: value,
            //     data: data,
            // })
        })
    },

    getNotifications: (req, res) => {
        return res.status(StatusCodes.OK).json({
            notifications: [{
                    id: 1,
                    exp: "11:22 ceva data",
                    text: "notificare random",
                },
                {
                    id: 2,
                    exp: "11:23 ceva data",
                    text: "notificare random2",
                }
            ]
        })
    },

    getApi: (req, res) => {
        return res.status(StatusCodes.OK).json(models.apiModel)
    }
}
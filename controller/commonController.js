const models = require(`../models`)
const { apiModel } = models
const { sign } = require("jsonwebtoken");
const { StatusCodes } = require(`http-status-codes`)
const { hashSync, genSaltSync, compare } = require("bcrypt");
module.exports = {
    getAWB: (req, res) => {
        console.log(req.body)
        if (req.body.AWB) {
            if (dbAWB.find(function (arg) {
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
                        error: "No user with that email!"
                    });
                } else {
                    const result = compare(req.body.password, results.password);
                    if (result) {
                        results.password = undefined;
                        const jsontoken = sign({ results }, process.env.secretKey, {
                            expiresIn: "1h"
                        });
                        if (value.rememberMe == true)
                            res.setHeader('Set-Cookie', 'token=' + jsontoken + `; HttpOnly;Secure;expires=Wed, 21 Oct 2030 07:28:00 GMT;Max-Age=9000000;Domain=${models.apiModel.domain};Path=/;overwrite=true`);
                        else
                            res.setHeader('Set-Cookie', 'token=' + jsontoken + `; HttpOnly;Domain=${models.apiModel.domain};Path=/`);
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
    handleLogout: (req, res) => {
        console.log("cookie " + req.headers.cookie);
        const token = req.headers.cookie.split('=')[1];
        res.setHeader(`Set-Cookie`, `token=deleted;HttpOnly;Secure;expires= Thu, 01 Jan 1970 00:00:00 GMT;Domain=${models.apiModel.domain};Path=/;overwrite=true`);

        return res.json({
            success: true,
            redirect: `/`
        });
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
        let isLoggedIn = req.accountType ? true : false
        switch (req.accountType) {
            case `user`:
                return res
                    .status(StatusCodes.OK)
                    .json({ ...apiModel.baseApi, ...apiModel.userApi, isLoggedIn, })
            case `driver`:
                return res
                    .status(StatusCodes.OK)
                    .json({ ...apiModel.baseApi, ...apiModel.userApi, ...apiModel.driverApi, isLoggedIn, })
            case `employee`:
                return res
                    .status(StatusCodes.OK)
                    .json({ ...apiModel.baseApi, ...apiModel.userApi, ...apiModel.employeeApi, isLoggedIn, })
            case `admin`:
                return res
                    .status(StatusCodes.OK)
                    .json({ ...apiModel.baseApi, ...apiModel.userApi, ...apiModel.driverApi, ...apiModel.employeeApi, ...apiModel.adminApi, isLoggedIn, })
            default:
                return res
                    .status(StatusCodes.OK)
                    .json(apiModel.baseApi)
        }
    }
}
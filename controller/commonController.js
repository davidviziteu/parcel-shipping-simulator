const models = require(`../models`)
const { apiModel } = models
const { sign } = require("jsonwebtoken");
const { StatusCodes } = require(`http-status-codes`)
const { hashSync, genSaltSync, compare } = require("bcrypt");
module.exports = {
    checkIfAwbExists: (req, res) => {
        console.log(req.parameters)
        if (!req.parameters.awb)
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: "missing awb from query parameters"
            })

        if (req.parameters.awb == "example1" || req.parameters.awb == "example2")
            return res.status(StatusCodes.OK).json({ success: true })

        return res.status(StatusCodes.NOT_FOUND).json({
            error: "at the moment there are only 2 awbs suported: example1 and example2"
        })
    },
    trackAwb: (req, res) => {
        if (!req.parameters.awb)
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: "missing awb from query parameters"
            })
        if (req.parameters.awb == "example1")
            return res.status(StatusCodes.OK).json({
                awb: "example1",
                events: {
                    statusComandPrimita: [
                        `Comanda a fost primită 7-apr-2021, 19:22:30`
                    ],
                    statusRidicare: [
                        `Pachetul urmează a fi ridicat de la expeditor în data de 8-apr-2021`
                    ]
                },
            })
        if (req.parameters.awb == "example2")
            return res.status(StatusCodes.OK).json({
                awb: "example2",
                events: {
                    statusComandPrimita: [
                        `Comanda a fost primită 7-apr-2021, 19:22:30`
                    ],
                    statusRidicare: [
                        `Pachetul urmează a fi ridicat de la expeditor în data de 8-apr-2021`
                    ],
                    statusTranzit: [
                        "A părăsit hub - ul Focșani în data de 1 - apr - 2021, 21: 30: 22",
                        `Șofer - Vasile Vasilescu(ID - 1256)`,
                        `A ajuns în hub - ul Bacău în data de 2 - apr - 2021, 00: 30: 21`,
                        `A părăsit hub - ul Bacău în data de 3 - apr - 2021, 21: 30: 12`,
                        `Șofer - Vasile Alexandrescu(ID - 332)`,
                        `A ajuns în hub - ul Iași în data de 3 - apr - 2021, 00: 10: 21`,
                    ],
                    statusLivrare: [
                        `Livrare astăzi, 3 - apr - 2021`,
                        `Șofer - Poescu Andrei(ID - 3323) - masina is - 33 - abc`,
                        `Curierul a raportat autoturism avariat, livrare amânată`,
                        `Livrare astăzi, 5 - apr - 2021`,
                        `Șofer - Poescu Andrei(ID - 3323) - masina is - 33 - abc`,
                    ],
                    statusDestinar: [
                        `livrat`,
                        `sau altceva`
                    ],
                },
                details: [
                    "fragil",
                    "exemplu detalii2"
                ],
                selectedOptions: [
                    1, 2, 3
                ]
            })
        return res.status(StatusCodes.NOT_FOUND).json({
            error: "at the moment there are only 2 awbs suported: example1 and example2"
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
                    error: error
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

        // console.log(req.body);
        // return res.status(StatusCodes.OK).json({
        //     notifications: [{
        //         id: 1,
        //         expiry_date: "11:22 ceva data",
        //         text: "notificare random",
        //     },
        //     {
        //         id: 2,
        //         exp: "11:23 ceva data",
        //         text: "notificare random2",
        //     }
        //     ]
        // })
        req.db.getNotifications((err, results) => {
            if (err) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    err: err.message
                })
            } else res.status(StatusCodes.OK).json({
                success: 1,
                data: results
            })
        })

    },

    getApi: (req, res) => {
        let loginType = req.accountType ? req.accountType : false
        switch (req.accountType) {
            case `user`:
                return res
                    .status(StatusCodes.OK)
                    .json({ ...apiModel.baseApi, ...apiModel.userApi, loginType, })
            case `driver`:
                return res
                    .status(StatusCodes.OK)
                    .json({ ...apiModel.baseApi, ...apiModel.userApi, ...apiModel.driverApi, loginType, })
            case `employee`:
                return res
                    .status(StatusCodes.OK)
                    .json({ ...apiModel.baseApi, ...apiModel.userApi, ...apiModel.employeeApi, loginType, })
            case `admin`:
                return res
                    .status(StatusCodes.OK)
                    .json({ ...apiModel.baseApi, ...apiModel.userApi, ...apiModel.driverApi, ...apiModel.employeeApi, ...apiModel.adminApi, loginType, })
            default:
                return res
                    .status(StatusCodes.OK)
                    .json(apiModel.baseApi)
        }
    }
}
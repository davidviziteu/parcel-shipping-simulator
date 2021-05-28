const models = require(`../models`)
const { apiModel } = models
const { sign } = require("jsonwebtoken");
const { StatusCodes } = require(`http-status-codes`)
const { hashSync, genSaltSync, compare } = require("bcrypt");
const { orderDashboardModel } = models.orderModel

module.exports = {
    trackAwb: async (req, res) => {
        console.log(`here`);
        if (!req.parameters.awb)
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: "missing awb from query parameters"
            })
        try {
            let awbDataPromise = req.db.getDetailsOrder(req.parameters.awb);
            let awbEventsPromise = req.db.getAwbEvents(req.parameters.awb);
            const [awbData, awbRawEvents] = await Promise.all([awbDataPromise, awbEventsPromise])
            let awbEventsObject = models.orderModel.orderDashboardModel
            console.log(awbRawEvents);
            console.log(awbEventsObject);
            //check for auth
            awbRawEvents.forEach(awbEv => {
                awbEventsObject[awbEv.event_type].push(`${awbEv.details} ${awbEv.employees_details} ${awbEv.date_time}`)
            });

            return res.status(StatusCodes.OK).json({
                success: true,
                data: awbData,
                events: awbEventsObject
            })
        } catch (error) {
            if (error == `No such awb in db`)
                return res.status(StatusCodes.NOT_FOUND).json({ success: false, error: `No such awb in db` })
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: error.message })
        }
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
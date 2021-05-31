const models = require(`../models`)
const { apiModel } = models
const { sign } = require("jsonwebtoken");
const { StatusCodes } = require(`http-status-codes`)
const { hashSync, genSaltSync, compare } = require("bcrypt");
const { orderDashboardModel, awbDetailsModel } = models.orderModel

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

            let awbEventsObject = new orderDashboardModel()
            let awbDetailsObject = new awbDetailsModel()

            if (!req.accountType) { // || if req.userId != awbData.id...........
                awbRawEvents.forEach(awbEv => {
                    awbEventsObject[awbEv.event_type].push(`${awbEv.details} ${awbEv.date_time}`)
                });
                awbDetailsObject.sender.push(awbData.fullName_sender)
                awbDetailsObject.destinatary.push(awbData.fullName_receiver)
                awbData.preference1 ? awbDetailsObject.other.push(`Livrare sâmbătă`) : null
                awbData.preference2 ? awbDetailsObject.other.push(`Fragil`) : null
                awbData.preference3 ? awbDetailsObject.other.push(`andreea ce inseamna 'preferinta3'???????????`) : null
                return res.status(StatusCodes.OK).json({
                    success: true,
                    data: awbDetailsObject,
                    events: awbEventsObject
                })
            }

            if (req.accountType == `driver` || req.accountType == `admin` || req.accountType == `employee`) {
                awbRawEvents.forEach(awbEv => {
                    awbEventsObject[awbEv.event_type].push(`${awbEv.details} ${awbEv.employees_details} ${awbEv.date_time}`)
                });
            } else { //else if req.userId == awbData.id...........
                awbRawEvents.forEach(awbEv => {
                    awbEventsObject[awbEv.event_type].push(`${awbEv.details} ${awbEv.date_time}`)
                });
            }

            awbDetailsObject.sender.push(awbData.fullName_sender)
            awbDetailsObject.sender.push(`Persoana de contact - ${awbData.contactPerson_sender}`)
            awbDetailsObject.sender.push(`Telefon - ${awbData.phone_sender}`)
            awbDetailsObject.sender.push(`Email - ${awbData.email_sender}`)
            awbDetailsObject.sender.push(`Adresa -
                        România, ${awbData.county_sender}, ${awbData.city_sender}, 
                        strada ${awbData.address_sender}`)

            awbDetailsObject.destinatary.push(awbData.fullName_receiver)
            awbDetailsObject.destinatary.push(`Persoana de contact - ${awbData.contactPerson_receiver}`)
            awbDetailsObject.destinatary.push(`Telefon - ${awbData.phone_receiver}`)
            awbDetailsObject.destinatary.push(`Email - ${awbData.email_sender}`)
            awbDetailsObject.destinatary.push(`Adresa -
                        România, ${awbData.county_receiver}, ${awbData.city_receiver},
                        strada ${awbData.address_receiver}`)

            awbData.preference1 ? awbDetailsObject.other.push(`Deschidere la livrare`) : null
            awbData.preference2 ? awbDetailsObject.other.push(`Livrare sâmbătă`) : null
            awbData.preference3 ? awbDetailsObject.other.push(`Fragil`) : null
            awbData.payment ? awbDetailsObject.other.push(`Metoda de plată - ${awbData.payment}`) : null

            awbData.mentions ? awbDetailsObject.other.push(`Mențiuni - '${awbData.mentions}'`) : null

            return res.status(StatusCodes.OK).json({
                success: true,
                data: awbDetailsObject,
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
        req.db.getNotifications((err, results) => {
            if (err) {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    err: err.message
                })
            } else res.status(StatusCodes.OK).json({
                success: true,
                data: results
            })
        })

    },
    estimateCost: (req, res) => {
        if (!req.parameters.distance)
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: "missing distance from query parameters"
            })
        req.db.getBasePrice((error, results) => {
            if (error) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    err: err.message
                })
            } else {
                var price = Math.round(results.price + req.parameters.distance / 10000);
                res.status(StatusCodes.OK).json({
                    success: 1,
                    data: price
                })
            }
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
const models = require(`../models`)
const { apiModel } = models
const { sign } = require("jsonwebtoken");
const { StatusCodes } = require(`http-status-codes`)
const { hashSync, genSaltSync, compareSync } = require("bcrypt")
const { orderDashboardModel, awbDetailsModel } = models.orderModel
const nodemailer = require('nodemailer');
const fetch = require('node-fetch');
const jwt_decode = require('jwt-decode');
const builder = require('xmlbuilder');
const newUserSchema = models.userModel.newUserSchema;

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'proiecttwpss@gmail.com',
        pass: 'proiecttv'
    }
});

var mailOptions = {
    from: 'curier@gmail.com',
    to: '',
    subject: '',
    text: ''
};

module.exports = {
    createAccountUser: (req, res) => {
        const body = req.body
        if (req.accountType == `admin` && body.type != `user`) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: 0,
                error: "doar adminul poate executa aceasta comanda!"
            })
        }
        const salt = genSaltSync(10)
        body.password = hashSync(body.password, salt)
        const { error, value } = newUserSchema.validate(body);
        if (error) {
            return res.status(200).json({
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
                body.id = results.insertId
                body.password = undefined
                body.appCodeName = req.headers.appcodename
                body.appName = req.headers.appname
                body.appVersion = req.headers.appversion
                body.product = req.headers.product
                body.platform = req.headers.platform
                results = body
                const jsontoken = sign({ results }, process.env.secretKey, {
                    expiresIn: "1h"
                });
                res.setHeader('Set-Cookie', 'token=' + jsontoken + `; HttpOnly;Domain=${models.apiModel.domain};Path=/`);
                res.status(200).json({
                    success: true,
                    redirect: `/dashboard-user.html`
                })
                mailOptions.to = body.email
                mailOptions.subject = 'Confirmare creare cont'
                mailOptions.text = 'Ți-ai creat cont cu succes!'
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
                    if (awbEventsObject[awbEv.event_type])
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
                    if (awbEventsObject[awbEv.event_type])
                        awbEventsObject[awbEv.event_type].push(`${awbEv.details} ${awbEv.employees_details} ${awbEv.date_time}`)
                });
            } else { //else if req.userId == awbData.id...........
                awbRawEvents.forEach(awbEv => {
                    if (awbEventsObject[awbEv.event_type])
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
            console.error(error);
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
                    const result = compareSync(req.body.password, results.password);
                    if (result) {
                        results.password = undefined;
                        results.appversion = req.headers.appversion;
                        results.platform = req.headers.platform;
                        const jsontoken = sign({ results }, process.env.secretKey, {
                            expiresIn: "24h"
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
                            error: "Invalid password!"
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
    estimateCost: async (req, res) => {
        var city1 = req.parameters.source;
        var city2 = req.parameters.destination;
        if (!city1 || !city2)
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: "missing cities from query parameters"
            })
        const { error, value } = models.commonModel.estimateCostSchema.validate(req.body);
        if (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: error.message
            })
        }
        var response1 = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${city1}&apiKey=d2cb09e3081941d7ba2ce4970a7b2e81`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        var coordinates1 = await response1.json();
        var response2 = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${city2}&apiKey=d2cb09e3081941d7ba2ce4970a7b2e81`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        var coordinates2 = await response2.json();
        const data = {
            mode: 'drive',
            sources: [{ location: [coordinates1.features[0].properties.lon, coordinates1.features[0].properties.lat] }],
            targets: [{ location: [coordinates2.features[0].properties.lon, coordinates2.features[0].properties.lat] }]
        }
        var response3 = await fetch('https://api.geoapify.com/v1/routematrix?apiKey=d2cb09e3081941d7ba2ce4970a7b2e81', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        var dist = await response3.json();
        var distanceCalculated = dist.sources_to_targets[0][0].distance;
        req.db.getBasePrice((error, results) => {
            if (error) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    err: err.message
                })
            } else {
                var price = Math.round(results.price + distanceCalculated / 10000);
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
    },
    getDriverCar: (req, res) => {
        switch (req.accountType) {
            case `driver`:
                req.db.getDriverCar((error, results) => {
                    if (error) {
                        res.status(StatusCodes.BAD_REQUEST).json({
                            success: false,
                            err: err.message
                        })
                    } else {
                        res.status(StatusCodes.OK).json({
                            success: true,
                            data: results
                        })
                    }
                })
            case `admin`:
                //am dat copy la asta in alta parte
                req.db.getDriverCarCounty((error, results) => {
                    if (error) {
                        res.status(StatusCodes.BAD_REQUEST).json({
                            success: false,
                            err: err.message
                        })
                    } else {
                        res.status(StatusCodes.OK).json({
                            success: true,
                            data: results
                        })
                    }
                })
        }
    },
    helloWord: (req, res) => {
        const token = req.headers.cookie.split('=')[1];
        var decoded = jwt_decode(token);
        if (!decoded.results.type) {
            console.log("aici")
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: `not on dashboards`
            })
        } else {
            res.status(200).json({
                success: true,
                message: "Hello, " + decoded.results.name + " " + decoded.results.surname + " !"
            })
        }
    },
    RSSFeed: (req, res) => {
        const awb = req.parameters.awb
        console.log(awb)
        req.db.getLastAwbEvent(awb, (error, results) => {
            if (error) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    err: error.message
                })
            }
            else {
                var doc = builder.create('rss');
                var date = results[0].date_time
                //console.log(date)
                var x = date.toString().split("T")
                var y = x[1].toString().split(".")[0]
                doc.att('version', '2.0')
                    .ele('channel')
                    .ele('title')
                    .txt("Urmareste comanda pe PSS")
                    .up()
                    .ele('link')
                    .txt("https://parcel-shipping-simulator.herokuapp.com")
                    .up()
                    .ele('description')
                    .txt('PSS')
                    .up()
                    .ele('item')
                    .ele('event-type')
                    .txt(results[0].event_type)
                    .up()
                    .ele('details')
                    .txt(results[0].details)
                    .up()
                    .ele('employees-details')
                    .txt(results[0].employees_details)
                    .up()
                    .ele('date')
                    .txt(x[0] + " " + y + ")")
                    .up()
                    .up()
                    .up()
                console.log(doc.toString({ pretty: true }));
                res.write('<? xml version = "1.0" encoding = "UTF-8" ?>\n')
                res.write(doc.toString({ pretty: true }))
                res.end()
            }
        })

    }
}
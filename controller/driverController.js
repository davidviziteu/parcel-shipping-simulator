const { StatusCodes } = require(`http-status-codes`)
const models = require("../models")
const hostName = require("../models/apiModel")
const { id } = require("../models/orderModel")
const jwt_decode = require('jwt-decode');
const fetch = require('node-fetch');

const driverEventsSchema = models.userModel.driverEventsSchema

module.exports = {
    addEvents: async (req, res) => {
        const body = req.body
        const { error, value } = driverEventsSchema.validate(body)
        if (error) {
            console.log(error)
            return res.status(300).json({
                success: false,
                error: error.message
            })
        }
        var ok = false;
        for (var i in body) {
            if (body[i] == true && i != "toPickup" && i != "toDeliver") ok = true
        }
        if (!ok) {
            return res.status(300).json({
                success: false,
                error: "unselected"
            })
        }
        req.db.getDriverCar(req.accountId, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: false,
                    error: error.message
                })
            }
            else {
                if (body.task == "local" && body.toPickup && body.picked_up) {
                    const data = {
                        awb: body.awb,
                        event_type: "order-picked-up",
                        status: "order-picked-up",
                        details: "Ridicat de la expeditor",
                        employees_details: "Coletul a fost ridicat de soferul " + results.name + " cu masina " + results.registration_number + "de la client."
                    }
                    req.db.newAWBEvent(data, (error, results) => {
                        if (error) {
                            return res.status(200).json({
                                success: false,
                                error: error.message
                            })
                        }
                    })
                    req.db.updateStatusAWB(data, (error, results) => {
                        if (error) {
                            return res.status(200).json({
                                success: false,
                                error: error.message
                            })
                        }
                    })
                    return res.status(200).json({
                        success: true
                    })
                }
                else if (body.task == "local" && body.toPickup && body.delivered) {
                    const data = {
                        awb: body.awb,
                        event_type: 'order-picked-up',
                        status: 'order-in-local-base-sender',
                        details: 'Coletul ajuns la sediu',
                        employees_details: "Coletul a fost adus la sediul local de soferul " + results.name + " cu masina " + results.registration_number + ".",
                    }
                    req.db.newAWBEvent(data, (error, results) => {
                        if (error) {
                            return res.status(200).json({
                                success: false,
                                error: error.message
                            })
                        }
                    })
                    req.db.updateStatusAWB(data, (error, results) => {
                        if (error) {
                            return res.status(200).json({
                                success: false,
                                error: error.message
                            })
                        }
                    })
                    return res.status(200).json({
                        success: true
                    })
                }
                else if (body.task == "local" && body.toDeliver && body.delivered) {
                    const data = {
                        awb: body.awb,
                        event_type: 'order-destinatary',
                        status: 'order-destinatary',
                        details: 'Livrat',
                        employees_details: "Coletul a fost livrat de soferul " + results.name + " cu masina " + results.registration_number + ".",
                    }
                    req.db.newAWBEvent(data, (error, results) => {
                        if (error) {
                            return res.status(200).json({
                                success: false,
                                error: error.message
                            })
                        }
                    })
                    req.db.updateStatusAWB(data, (error, results) => {
                        if (error) {
                            return res.status(200).json({
                                success: false,
                                error: error.message
                            })
                        }
                    })
                    return res.status(200).json({
                        success: true
                    })
                }
                else if (body.task == "national" && body.toPickup && body.picked_up) {
                    const data = {
                        awb: body.awb,
                        event_type: 'order-in-transit',
                        status: 'order-in-transit',
                        details: 'A plecat de la sediul din Sighisoara',
                        employees_details: "Coletul a fost ridicat de soferul " + results.name + " cu masina " + results.registration_number + "din baza din Sighisoara.",
                    }
                    req.db.newAWBEvent(data, (error, results) => {
                        if (error) {
                            return res.status(200).json({
                                success: false,
                                error: error.message
                            })
                        }
                    })
                    req.db.updateStatusAWB(data, (error, results) => {
                        if (error) {
                            return res.status(200).json({
                                success: false,
                                error: error.message
                            })
                        }
                    })
                    return res.status(200).json({
                        success: true
                    })
                }
                else if (body.task == "national" && body.toPickup && body.delivered) {
                    const data = {
                        awb: body.awb,
                        event_type: 'order-in-transit',
                        status: 'order-in-local-base-sender',
                        details: 'A ajuns in orasul de livrare',
                        employees_details: "Coletul a fost adus de soferul " + results.name + " cu masina " + results.registration_number + "din baza din Sighisoara.",
                    }
                    req.db.newAWBEvent(data, (error, results) => {
                        if (error) {
                            return res.status(200).json({
                                success: false,
                                error: error.message
                            })
                        }
                    })
                    req.db.updateStatusAWB(data, (error, results) => {
                        if (error) {
                            return res.status(200).json({
                                success: false,
                                error: error.message
                            })
                        }
                    })
                    return res.status(200).json({
                        success: true
                    })
                }
                else if (body.task == "national" && body.toDeliver && body.picked_up) {
                    const data = {
                        awb: body.awb,
                        event_type: 'order-in-transit',
                        status: 'order-in-transit',
                        details: 'A plecat din baza locala',
                        employees_details: "Coletul a fost ridicat de soferul " + results.name + " cu masina " + results.registration_number + "din baza locala.",
                    }
                    req.db.newAWBEvent(data, (error, results) => {
                        if (error) {
                            return res.status(200).json({
                                success: false,
                                error: error.message
                            })
                        }
                    })
                    req.db.updateStatusAWB(data, (error, results) => {
                        if (error) {
                            return res.status(200).json({
                                success: false,
                                error: error.message
                            })
                        }
                    })
                    return res.status(200).json({
                        success: true
                    })
                }
                else if (body.task == "national" && body.toDeliver && body.delivered) {
                    const data = {
                        awb: body.awb,
                        event_type: 'order-in-transit',
                        status: 'order-in-national-base',
                        details: 'A ajuns in baza din Sighisoara',
                        employees_details: "Coletul a fost adus de soferul " + results.name + " cu masina " + results.registration_number + "in baza din Sighisoara.",
                    }
                    req.db.newAWBEvent(data, (error, results) => {
                        if (error) {
                            return res.status(200).json({
                                success: false,
                                error: error.message
                            })
                        }
                    })
                    req.db.updateStatusAWB(data, (error, results) => {
                        if (error) {
                            return res.status(200).json({
                                success: false,
                                error: error.message
                            })
                        }
                    })
                    return res.status(200).json({
                        success: true
                    })
                }
            }
        })
    },
    detailsOrder: (req, res) => {
        req.db.getDetailsOrder(req.awb, (error, results) => {
            if (error) {
                console.log(error)
                res.status(500).json({
                    success: false,
                    error: error.message
                })
            }
            else if (results[0] != undefined) {
                res.status(200).json({
                    success: true,
                    fullName_sender: results[0].fullName_sender,
                    county_sender: results[0].county_sender,
                    city_sender: results[0].city_sender,
                    address_sender: results[0].address_sender,
                    phone_sender: results[0].phone_sender,

                    fullName_receiver: results[0].fullName_receiver,
                    county_receiver: results[0].county_receiver,
                    city_receiver: results[0].city_receiver,
                    address_receiver: results[0].address_receiver,
                    phone_receiver: results[0].phone_receiver,

                    nrEnvelope: results[0].nrEnvelope,
                    nrParcel: results[0].nrParcel,
                    weight: results[0].weight,

                    length: results[0].length,
                    width: results[0].width,
                    height: results[0].height,

                    date: results[0].date,
                    hour: results[0].hour,

                    preferance1: results[0].preferance1,
                    preferance2: results[0].preferance2,
                    preferance3: results[0].preferance3,

                    payment: results[0].payment,

                    mentions: results[0].mentions,

                    status: results[0].status

                })
            }
            else {
                res.status(200).json({
                    success: true
                })
            }
        })
        return res;
    },
    getTask: (req, res) => {

        res.status(StatusCodes.OK).json({
            task: "Livrare/preluare colete local", //sau "Livrare/preluare colete national - Brașov",
            countySource: "Iasi", //locul unde for trebui facute livrarile/pickup urile
            countyDestination: "Iasi", //locul unde for trebui facute livrarile/pickup urile
            car: "IS47AVI", //locul unde for trebui facute livrarile/pickup urile
            toDeliver: [1, 2, 3], //array de awb uri (de int uri)
            toPickup: [], //array de awb uri (de int uri)
        })
    },
}
const { StatusCodes } = require(`http-status-codes`)
const models = require("../models")
const { id } = require("../models/orderModel")

const driverEventsSchema = models.userModel.driverEventsSchema

module.exports = {
    addEvents: (req, res) => {
        const body = req.body
        const { error, value } = driverEventsSchema.validate(body)
        if (error) {
            return res.status(300).json({
                success: false,
                error: error.message
            })
        }
        var ok = false;
        for (var i in body) {
            if (body[i] == true) ok = true
        }
        if (!ok) {
            return res.status(300).json({
                success: false,
                error: "unselected"
            })
        }
        req.db.addEventsDriver(body, (error, results) => {
            if (error) {
                console.log(error.message)
                res.status(500).json({
                    success: false,
                    error: error.message
                })
            }
            else res.status(200).json({
                success: true
            })
        })
        return res;
    },
    detailsOrder: (req, res) => {
        req.awb = 5;
        req.db.getDetailsOrder(req.awb, (error, results) => {
            if (error) {
                console.log(error)
                res.status(500).json({
                    success: false,
                    error: error.message
                })
            }
            else if (results[0] != undefined) {
                console.log("aici")
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
            task: "Livrare/preluare colete local", //sau "Livrare/preluare colete national",
            countySource: "Iasi", //locul unde for trebui facute livrarile/pickup urile
            countyDestination: "Iasi", //locul unde for trebui facute livrarile/pickup urile
            car: "IS47AVI", //locul unde for trebui facute livrarile/pickup urile
            toDeliver: [1, 2, 3], //array de awb uri (de int uri)
            toPickup: [], //array de awb uri (de int uri)
        })
    },
}
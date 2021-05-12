const { StatusCodes } = require(`http-status-codes`)
const models = require("../models")

const driverEventsSchema = models.userModel.driverEventsSchema

module.exports = {
    addEvents: (req, res) => {
        const body = req.body
        console.log(body)
        const { error, value } = driverEventsSchema.validate(body)
        if (error) {
            return res.status(300).json({
                success: false,
                error: error.message
            })
        }
        var ok = false;
        for (var i in body) {
            if (i == true) ok = true
        }
        if (!ok) {
            return res.status(300).json({
                success: false,
                error: "unselected"
            })
        }
        req.db.addEventsDriver(body, (error, results) => {
            if (error) res.status(500).json({
                success: false,
                error: error.message
            })
            else res.status(200).json({
                success: true
            })
        })
        return res;
    }
}
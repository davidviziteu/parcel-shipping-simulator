const { StatusCodes } = require(`http-status-codes`)
const models = require("../models")
const { sendDebugInResponse } = require("../models/apiModel")

exports.confirmDenyOrder = async (req, res) => {
    // req.db.updateStatusAWB
    if (!req.accountType || (req.accountType != `employee` && req.accountType != `admin` && req.accountType != `driver`))
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
        })
    const { error } = models.orderModel.confirmDenyOrderInputModel.validate(req.body)
    if (error)
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            error: error.message
        })
    req.db.updateStatusAWB(req.body, (error) => {
        if (error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                ...sendDebugInResponse && { error: error.message }
            })
        let details = req.body.status == `order-destinatary` ? "Comanda a fost livrată" : "Clientul a refuzat comanda"
        let employees_details = `status marcat de ${req.accountType}, id:${req.accountId}`
        req.db.newAWBEvent({
            awb: req.body.awb,
            event_type: "order-destinatary",
            details: details,
            employees_details: employees_details
        }, error => {
            if (error)
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    ...sendDebugInResponse && { error: error.message }
                })
            return res.status(StatusCodes.OK).json({
                success: true,
            })
        })
    })
}
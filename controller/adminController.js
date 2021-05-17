const { StatusCodes } = require(`http-status-codes`)
const models = require("../models")

module.exports = {
    addNotification: (req, res) => {
        console.log(req.body)
        if (!req.body)
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: `missing body`
            })

        const { error, value } = models.notifcationModel.newNotificationSchema.validate(req.body)
        if (error)
            return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    error: error
                })
                //insereaza in db
        res.status(StatusCodes.OK).json({
            success: true,
        })
    },
}
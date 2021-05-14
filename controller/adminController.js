const { StatusCodes } = require(`http-status-codes`)
const models = require("../models")

module.exports = {
    addNotification: (req, res) => {
        if (!req.body)
            return res.stats(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: `missing body`
            })

        const { error, value } = models.notifcationModel.newNotificationSchema.validate(req.body)
        if (error)
            return res.stats(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: error
            })
        //insereaza in db
        res.stats(StatusCodes.OK).json({
            success: true,
        })
    },
}
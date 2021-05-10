const { StatusCodes } = require(`http-status-codes`)
const models = require("../models")

module.exports = {
    addEvents: (req, res) => {
        const body = req.body
        console.log(body)
        //body.id = req.userId
    }
}
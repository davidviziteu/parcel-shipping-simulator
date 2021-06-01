const mainHost = process.env.PORT ? `https://parcel-shipping-simulator.herokuapp.com` : `http://localhost:4000`
var cityList = ["Ilfov", "Cluj", "Constanța", "Dolj", "Galați", "Iași", "Oradea", "Sibiu", "Timișoara"];
const { StatusCodes } = require(`http-status-codes`)

exports.getDriverTask = (req, res) => {
    //auth
    if (!req.parameters.county)
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "County required in parameters"
        })

    if (!req.parameters.idDriver)
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Id driver required in parameters"
        })

    //do validation of county in params

    try {

    } catch (error) {

    }
}
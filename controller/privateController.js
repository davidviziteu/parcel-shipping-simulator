const { StatusCodes } = require(`http-status-codes`)
const models = require("../models")

/**
 * controller ul pt microservicii
 * 
 * 
 */

exports.getDriverData = async (req, res) => {

    req.db.getDriverCarCounty(`Iași`, (error, results) => {
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

    return
    let data = {
        county: "Iași",
        driverList: [
            { id: 1, car: "is05www", county: "Iași" },
            { id: 2, car: "is07eee", county: "Iași" },
        ],
        awbList: [
            { awb: 1, currentLocation: "Iași Base", countyDestination: "Iași", }, //local to deliver
            { awb: 2, currentLocation: "Iași", countyDestination: "Iași", }, //local to pickup
            { awb: 3, currentLocation: "Iași", countyDestination: "Iași", }, //local to pickup
            { awb: 4, currentLocation: "Iași", countyDestination: "Iași", }, //local to pickup
            { awb: 5, currentLocation: "Iași Base", countyDestination: "Iași", }, //local to deliver
            { awb: 6, currentLocation: "Iași", countyDestination: "Iași", }, //local to pickup
            { awb: 7, currentLocation: "National Base", countyDestination: "Bucuresti", }, //trap
            { awb: 8, currentLocation: "Iași Base", countyDestination: "Craiova", }, //natinal to deliver
            { awb: 9, currentLocation: "Iași Base", countyDestination: "Craiova", }, //natinal to deliver
            { awb: 10, currentLocation: "Iași Base", countyDestination: "Craiova", }, //natinal to deliver
            { awb: 11, currentLocation: "Iași", countyDestination: "Dolj", }, //local to pickup
            { awb: 12, currentLocation: "National Base", countyDestination: "Iași", }, //natinal to pickup
            { awb: 13, currentLocation: "National Base", countyDestination: "Iași", }, //natinal to pickup
            { awb: 14, currentLocation: "National Base", countyDestination: "Iași", }, //natinal to pickup
            { awb: 15, currentLocation: "National Base", countyDestination: "Iași", }, //natinal to pickup
            { awb: 16, currentLocation: "National Base", countyDestination: "Iași", }, //natinal to pickup
            { awb: 17, currentLocation: "National Base", countyDestination: "Iași", }, //natinal to pickup
            { awb: 18, currentLocation: "National Base", countyDestination: "Iași", }, //natinal to pickup
        ],
    }
    res.json({ ...data })

}
const { StatusCodes } = require(`http-status-codes`)
const models = require("../models")

/**
 * controller ul pt microservicii
 * 
 * 
 */

exports.getDriverData = async (req, res) => {
    if (!req.parameters.county)
        return req.status(StatusCodes.BAD_REQUEST);

    try {
        let driversListPromise = await req.db.getDriverCarCounty(req.parameters.county);
        let orderDetailsPromise = await req.db.getOrdersRelatedToCounty(req.parameters.county);
        let awbList = {};
        //
        const [driversList, orderDetails] = await Promise.all([driversListPromise, orderDetailsPromise]);

        awbList = orderDetails.map((v, i, m) => {
            if (v.status == 'order-received')
                return {
                    awb: v.awb,
                    currentLocation: v.county_sender,
                    countyDestination: v.county_receiver,
                }
        })
        return res.status(StatusCodes.OK).json({
            driversList: driversList,
            awbList: awbList,
        });
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: error.message
        });
    }


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
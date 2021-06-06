const { StatusCodes } = require(`http-status-codes`)
const models = require("../models")

/**
 * controller ul pt microservicii
 * 
 * 
 */

exports.getDriverData = async (req, res) => {
    // return req.status(StatusCodes.BAD_REQUEST).json({
    //     message: "disable this to prevent unauthorized access"
    // });
    if (!req.parameters || !req.parameters.county)
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            error: "missing county from query parameters"
        });


    try {
        let driversListPromise = req.db.getDriverCarCounty(req.parameters.county);
        let orderDetailsPromise = req.db.getOrdersRelatedToCounty(req.parameters.county);
        let awbList = {};
        //
        const [driverList, orderDetails] = await Promise.all([driversListPromise, orderDetailsPromise]);

        awbList = orderDetails.map((v, i, m) => {
            if (v.status == 'order-received')
                return {
                    awb: v.awb,
                    currentLocation: v.county_sender,
                    countyDestination: v.county_receiver,
                }
            if (v.status == `order-in-local-base-sender`) {
                if (v.county_receiver == v.county_sender)
                    return {
                        awb: v.awb,
                        currentLocation: `${v.county_sender} Base`,
                        countyDestination: v.county_receiver,
                    }
                //este in baza locala a expeditorului si tre sa ajunga la baza nationala
                return {
                    awb: v.awb,
                    currentLocation: `${v.county_sender} Base`,
                    countyDestination: `National Base`,
                }
            }
            if (v.status == `order-in-local-base-receiver`) {
                console.log(v.awb, v.status);
                if (v.county_receiver == v.county_sender)
                    return {
                        awb: v.awb,
                        currentLocation: `${v.county_sender} Base`,
                        countyDestination: v.county_receiver,
                    }
                //este in baza locala a destinatarului si tre sa ajunga la destinatar
                return {
                    awb: v.awb,
                    currentLocation: `${v.county_receiver} Base`,
                    countyDestination: v.county_receiver,
                }
            }
            if (v.status == `order-in-national-base`)
                return {
                    awb: v.awb,
                    currentLocation: `National Base`,
                    countyDestination: v.county_receiver,
                }
        })
        awbList = awbList.filter(v => v != null)
        return res.status(StatusCodes.OK).json({
            county: req.parameters.county,
            driverList: driverList,
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
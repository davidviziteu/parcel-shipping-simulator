const mainHost = process.env.PORT ? `https://parcel-shipping-simulator.herokuapp.com` : `http://localhost:4000`
var cityList = ["Ilfov", "Cluj", "Constanța", "Dolj", "Galați", "Iași", "Oradea", "Sibiu", "Timișoara"];
const { StatusCodes, ReasonPhrases, getReasonPhrase } = require(`http-status-codes`);
const { db } = require("../models/driverTaskSchema");
const models = require('../models');
const { default: fetch } = require("node-fetch");
const { driverGetTaskMainServerDataInputSchema } = require("../models/dataInputModel");

const mainServerUrl = process.env.PORT ? `https://parcel-shipping-simulator.herokuapp.com` : `http://localhost:4000`

/**
 * o sa primeasca un id de sofer si niste task uri.
 * 
 * face fetch la main service pt a avea soferii, awb urile  
 *
 */
// let data = {
//     county: "Iași",
//     driverList: [
//         { id: 1, car: "is05www", county: "Iași" },
//         { id: 2, car: "is07eee", county: "Iași" },
//     ],
//     awbList: [
//         { awb: 1, currentLocation: "Iași Base", countyDestination: "Iași", }, //local to deliver
//         { awb: 2, currentLocation: "Iași", countyDestination: "Iași", }, //local to pickup
//         { awb: 3, currentLocation: "Iași", countyDestination: "Iași", }, //local to pickup
//         { awb: 4, currentLocation: "Iași", countyDestination: "Iași", }, //local to pickup
//         { awb: 5, currentLocation: "Iași Base", countyDestination: "Iași", }, //local to deliver
//         { awb: 6, currentLocation: "Iași", countyDestination: "Iași", }, //local to pickup
//         { awb: 7, currentLocation: "National Base", countyDestination: "Bucuresti", }, //trap
//         { awb: 8, currentLocation: "Iași Base", countyDestination: "Craiova", }, //natinal to deliver
//         { awb: 9, currentLocation: "Iași Base", countyDestination: "Craiova", }, //natinal to deliver
//         { awb: 10, currentLocation: "Iași Base", countyDestination: "Craiova", }, //natinal to deliver
//         { awb: 11, currentLocation: "Iași", countyDestination: "Dolj", }, //local to pickup
//         { awb: 12, currentLocation: "National Base", countyDestination: "Iași", }, //natinal to pickup
//         { awb: 13, currentLocation: "National Base", countyDestination: "Iași", }, //natinal to pickup
//         { awb: 14, currentLocation: "National Base", countyDestination: "Iași", }, //natinal to pickup
//         { awb: 15, currentLocation: "National Base", countyDestination: "Iași", }, //natinal to pickup
//         { awb: 16, currentLocation: "National Base", countyDestination: "Iași", }, //natinal to pickup
//         { awb: 17, currentLocation: "National Base", countyDestination: "Iași", }, //natinal to pickup
//         { awb: 18, currentLocation: "National Base", countyDestination: "Iași", }, //natinal to pickup
//     ],
// }

//un sofer poate cara maxim 20 de colete

const nationalCarPackagesLimit = 15
const localCarPackagesLimit = 15

exports.getDriverTask = async (req, res) => {

    if (req.accountType != `driver` && req.accountType != `admin` && req.accountType != `employee`)
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            error: ReasonPhrases.UNAUTHORIZED
        })

    const { error } = models.dataInputModel.driverGetTaskInputSchema.validate(req.body)
    if (error)
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            error: error
        })

    try {
        let currentDay = new Date(Date.now()).getDate();
        let dbResults = await req.db.countyTasks.find({ county: req.body.county });
        let data = {}
        if (dbResults.length > 0) {
            if (dbResults.length > 1)
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    error: `more than 1 entries for ${req.body.county} county in tasks done collection`
                })
            dbResults = dbResults[0]
            let hoursDiff = Math.abs(Date.parse(dbResults.lastTimeComputed) - Date.now()) / 36e5;
            console.log(`hours diff: ${hoursDiff}, date: ${dbResults.lastTimeComputed}`);
            if (isNaN(hoursDiff))
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    error: "hours difference is NaN"
                })
            if (hoursDiff <= 1) { // ar trebui sa fie 24 aici
                let driverTasks = await req.db.driverTasks.find({ id: req.body.id })
                if (!driverTasks)
                    return res.status(StatusCodes.NOT_FOUND).json({
                        error: "Driver not found in computed data"
                    })
                console.log(`got data for driver id = ${req.body.id} from db`);
                data.toDeliver = driverTasks[0].toDeliver
                data.toPickup = driverTasks[0].toPickup
                data.id = driverTasks[0].id
                data.county = driverTasks[0].county
                data.car = driverTasks[0].car
                data.task = driverTasks[0].task
                data.countySource = driverTasks[0].countySource
                data.countyDestination = driverTasks[0].countyDestination
                return res.status(StatusCodes.OK).json({
                    ...data
                })
            }
        }
        //do fetch from db and return
        let deleteDriverTasksPromise = req.db.driverTasks.deleteMany({ id: req.body.id })
        let deleteCountyTasksPromise = req.db.countyTasks.deleteMany({ county: req.body.county })
        let encoded = encodeURI(`${mainServerUrl}/api/private/driver-data?county=${req.body.county}`);
        let response = await fetch(encoded, {
            headers: { 'Cookie': `token=${req.token}` }
        })
        data = await response.json();
        if (!response.ok)
            return res.status(StatusCodes.FAILED_DEPENDENCY).json({
                success: false,
                error: `cannot fetch data from the main server at : ${mainServerUrl}`,
                mainServerError: data.error
            })
        const { error } = driverGetTaskMainServerDataInputSchema.validate(data)
        if (error)
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: error
            })

        if (!Array.isArray(data.driverList) || data.driverList.length == 0)
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: "body.driver list is not an array or is of length 0"
            })
        let availableDrivers = data.driverList.length

        console.log(data.awbList);
        let toDeliverLocalAwbs = data.awbList.filter(awbObj => awbObj.currentLocation == `${req.body.county} Base` && awbObj.countyDestination == `${req.body.county}`)
        let toPickupLocalAwbs = data.awbList.filter(awbObj => awbObj.currentLocation == `${req.body.county}`)

        let toDeliverNationalAwbs = data.awbList.filter(awbObj => awbObj.currentLocation == `${req.body.county} Base` && awbObj.countyDestination != `${req.body.county}`)
        let toPickupNationalAwbs = data.awbList.filter(awbObj => awbObj.currentLocation == "National Base" && awbObj.countyDestination == `${req.body.county}`)
        let localRequiredDrivers = Math.ceil(Math.max(toDeliverLocalAwbs.length, toPickupLocalAwbs.length) / localCarPackagesLimit)
        let nationalRequiredDrivers = Math.ceil(Math.max(toDeliverNationalAwbs.length, toPickupNationalAwbs.length) / nationalCarPackagesLimit)


        if (availableDrivers == 1) {
            let index = 0;
            if (currentDay % 2) {
                data.driverList[index].task = "Livrare / preluare colete local";
                data.driverList[index].countySource = `Baza locala ${data.county}`;
                data.driverList[index].countyDestination = data.county;
                data.driverList[index].toDeliver = [];
                data.driverList[index].toPickup = [];
                for (let i = 0; i < localCarPackagesLimit; i++) {
                    let awbObject
                    awbObject = toDeliverLocalAwbs.pop();
                    awbObject ? data.driverList[index].toDeliver.push(awbObject.awb) : null;
                    awbObject = toPickupLocalAwbs.pop();
                    awbObject ? data.driverList[index].toPickup.push(awbObject.awb) : null;
                }
            }
            else {
                data.driverList[index].task = "Livrare / preluare colete national";
                data.driverList[index].countySource = data.county;
                data.driverList[index].countyDestination = "Baza Nationala Sighisoara";
                data.driverList[index].toDeliver = [];
                data.driverList[index].toPickup = [];
                for (let i = 0; i < nationalCarPackagesLimit; i++) {
                    let awbObject
                    awbObject = toDeliverNationalAwbs.pop();
                    awbObject ? data.driverList[index].toDeliver.push(awbObject.awb) : null;
                    awbObject = toPickupNationalAwbs.pop();
                    awbObject ? data.driverList[index].toPickup.push(awbObject.awb) : null;
                }
            }
        }
        else { // if (nationalRequiredDrivers + localRequiredDrivers <= availableDrivers) 
            // nu e necesar

            let localDriversCount = 0;
            let nationalDriversCount = 0;

            //raportul ideal va fi 1 national / 3 locali

            //assign 

            for (let index = 0; index < availableDrivers; index++) {
                if (index % 3 == 0) {
                    data.driverList[index].task = "Livrare / preluare colete national";
                    data.driverList[index].countySource = data.county;
                    data.driverList[index].countyDestination = "Baza Nationala Sighisoara";
                    data.driverList[index].toDeliver = [];
                    data.driverList[index].toPickup = [];
                    for (let i = 0; i < nationalCarPackagesLimit; i++) {
                        let awbObject
                        awbObject = toDeliverNationalAwbs.pop();
                        awbObject ? data.driverList[index].toDeliver.push(awbObject.awb) : null;
                        awbObject = toPickupNationalAwbs.pop();
                        awbObject ? data.driverList[index].toPickup.push(awbObject.awb) : null;
                    }
                    continue;
                }

                data.driverList[index].task = "Livrare / preluare colete local";
                data.driverList[index].countySource = `${data.county}`;
                data.driverList[index].countyDestination = data.county;
                data.driverList[index].toDeliver = [];
                data.driverList[index].toPickup = [];
                for (let i = 0; i < localCarPackagesLimit; i++) {
                    let awbObject
                    awbObject = toDeliverLocalAwbs.pop();
                    awbObject ? data.driverList[index].toDeliver.push(awbObject.awb) : null;
                    awbObject = toPickupLocalAwbs.pop();
                    awbObject ? data.driverList[index].toPickup.push(awbObject.awb) : null;
                }
            }
        }
        //cache data
        try {
            let resultPromses = [,];

            resultPromise = await Promise.all([deleteDriverTasksPromise, deleteCountyTasksPromise])
            console.log("delete successfuly")

            resultPromses[0] = req.db.driverTasks.insertMany(data.driverList)
            let taskModel = new req.db.countyTasks({
                county: req.body.county,
                lastTimeComputed: Date.now(),
                drivers: data.driverList.map(driver => driver.id)
            });
            resultPromses[1] = taskModel.save()
            await Promise.all(resultPromses)
            console.log(`computed data for county = ${req.body.county} and saved results in db`);
        } catch (error) {
            console.error(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                db: error.message
            })
        }

        let requestedData = data.driverList.find(({ id }) => id == req.body.id)

        res.status(StatusCodes.OK).json({
            ...requestedData
        })
        // res.json({ distribuion: data.driverList })
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: error.message
        })
    }
}

exports.emptyDB = async (req, res) => {
    if (!req.accountType)
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false
        })
    try {
        await Promise.all([req.db.driverTasks.deleteMany(), req.db.countyTasks.deleteMany()]);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            db: error.message
        });
    }

    return res.status(StatusCodes.OK).json({
        success: true
    });
}

exports.updateDriverTask = async (req, res) => {
    try {


        if (req.accountType != `driver` && req.accountType != `admin` && req.accountType != `employee`)
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                error: ReasonPhrases.UNAUTHORIZED
            })
        const { error } = models.dataInputModel.driverUpdateTaskSchema.validate(req.body)
        if (error)
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: error
            })

        if (req.accountType == `driver` && req.body.id != req.accountId)
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                error: ReasonPhrases.UNAUTHORIZED
            })

        let driverTasks = await req.db.driverTasks.find({ id: req.body.id })
        if (!driverTasks)
            return res.status(StatusCodes.NOT_FOUND).json({
                error: "Driver not found in computed data"
            })
        console.log(`got data for driver id = ${req.body.id} from db`);
        driverTasks = driverTasks[0]
        console.log(driverTasks.toDeliver);
        console.log(driverTasks.toPickup);
        driverTasks.toDeliver = driverTasks.toDeliver.filter(awb => awb != req.body.remove)
        driverTasks.toPickup = driverTasks.toPickup.filter(awb => awb != req.body.remove)

        const filter = { _id: driverTasks._id };
        // replace the matched document with the replacement document


        await models.driverTaskSchema.replaceOne(filter, driverTasks);

        console.log(driverTasks);

        return res.status(StatusCodes.OK).json({
            success: true
        })
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: error.message
        })
    }
}


let a = {
    "distribuion": [
        {
            "id": 1,
            "car": "is05www",
            "county": "Iași",
            "task": "Livrare / preluare colete national",
            "countySource": "Iași",
            "countyDestination": "Baza Nationala Sighisoara",
            "toDeliver": [
                10,
                9,
                8
            ],
            "toPickup": [
                18,
                17,
                16,
                15,
                14,
                13,
                12
            ]
        },
        {
            "id": 2,
            "car": "is07eee",
            "county": "Iași",
            "task": "Livrare / preluare colete local",
            "countySource": "Iași",
            "countyDestination": "Iași",
            "toDeliver": [
                5,
                1
            ],
            "toPickup": [
                11,
                6,
                4,
                3,
                2
            ]
        }
    ]
}


let finalObject = {
    task: "Livrare/preluare colete local", //sau "Livrare/preluare colete national - Brașov",
    countySource: "Iași", //locul unde for trebui facute livrarile/pickup urile
    countyDestination: "Iași", //locul unde for trebui facute livrarile/pickup urile
    car: "IS47AVI", //locul unde for trebui facute livrarile/pickup urile
    toDeliver: [], //array de awb uri (de int uri)
    toPickup: [], //array de awb uri (de int uri)
}

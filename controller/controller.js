const mainHost = process.env.PORT ? `https://parcel-shipping-simulator.herokuapp.com` : `http://localhost:4000`
var cityList = ["Ilfov", "Cluj", "Constanța", "Dolj", "Galați", "Iași", "Oradea", "Sibiu", "Timișoara"];
const { StatusCodes } = require(`http-status-codes`);
const { db } = require("../models/driverTaskSchema");
const models = require('../models');

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


/**
 * o sa primeasca un id de sofer si niste task uri.
 * 
 * face fetch la main service pt a avea soferii, awb urile  
 *
 */
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

//un sofer poate cara maxim 20 de colete

const nationalCarPackagesLimit = 15
const localCarPackagesLimit = 15

exports.getDriverTask = async (req, res) => {
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
    let finalObject = {
        task: "Livrare/preluare colete local", //sau "Livrare/preluare colete national - Brașov",
        countySource: "Iași", //locul unde for trebui facute livrarile/pickup urile
        countyDestination: "Iași", //locul unde for trebui facute livrarile/pickup urile
        car: "IS47AVI", //locul unde for trebui facute livrarile/pickup urile
        toDeliver: [], //array de awb uri (de int uri)
        toPickup: [], //array de awb uri (de int uri)
    }
    try {
        let currentDay = new Date(Date.now()).getDate();
        let dbResult = await models.countyTasksDoneToday.findOne({ county: 'Iași' });
        if (dbResult)
            return //do fetch from db and return
        // let data = req.body

        if (!Array.isArray(data.driverList) || data.driverList.length == 0)
            return res.status(StatusCodes.BAD_REQUEST)
        let availableDrivers = data.driverList.length


        let toDeliverLocalAwbs = data.awbList.filter(awbObj => awbObj.currentLocation == "Iași Base" && awbObj.countyDestination == "Iași")
        let toPickupLocalAwbs = data.awbList.filter(awbObj => awbObj.currentLocation == "Iași")

        let toDeliverNationalAwbs = data.awbList.filter(awbObj => awbObj.currentLocation == "Iași Base" && awbObj.countyDestination != "Iași")
        let toPickupNationalAwbs = data.awbList.filter(awbObj => awbObj.currentLocation == "National Base" && awbObj.countyDestination == "Iași")
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
                data.driverList[index].countyDestination = "Baza Nationala Brasov";
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
            return res.json({ distribuion: data.driverList })
        }

        // if (nationalRequiredDrivers + localRequiredDrivers <= availableDrivers) 
        // nu e necesar

        let localDriversCount = 0;
        let nationalDriversCount = 0;

        //raportul ideal va fi 1 national / 3 locali

        //assign 

        for (let index = 0; index < availableDrivers; index++) {
            if (index % 3 == 0) {
                data.driverList[index].task = "Livrare / preluare colete national";
                data.driverList[index].countySource = data.county;
                data.driverList[index].countyDestination = "Baza Nationala Brasov";
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

        // res.status(StatusCodes.OK).json({
        //     task: "Livrare/preluare colete local", //sau "Livrare/preluare colete national - Brașov",
        //     countySource: "Iași", //locul unde for trebui facute livrarile/pickup urile
        //     countyDestination: "Iași", //locul unde for trebui facute livrarile/pickup urile
        //     car: "IS47AVI", //locul unde for trebui facute livrarile/pickup urile
        //     toDeliver: [1, 2, 3], //array de awb uri (de int uri)
        //     toPickup: [], //array de awb uri (de int uri)
        // })
        res.json({ distribuion: data.driverList })
    } catch (error) {
        console.error(error);
    }
}
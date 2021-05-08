const { Router } = require(`../utils/router.js`)
const url = require('url');
const fs = require('fs');
const path = require('path');

let dbAWB = [1, 2, 3];


let commonRouter = new Router();
commonRouter.get(`/api/getAWB`, (req, res) => {
    console.log(req.data)
    if (req.data.AWB) {
        if (dbAWB.find(function (arg) {
            return arg == req.data.AWB;
        }))
            return res.status(200).json({
                "succes": true
            })
        else return res.status(200).json({
            "succes": false
        })
    }
    return res.status(400).json({
        error: `Missing 'AWB' filed from request`
    })
});


module.exports = commonRouter
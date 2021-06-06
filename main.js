const http = require(`http`)
const jwt_decode = require('jwt-decode');
const routers = require(`./routes`)
const { App } = require(`./utils/app.js`)
const mongoose = require('mongoose');
const models = require('./models');

require("dotenv").config();


mongoose
    .connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to database')
    });

// models.countyTasksDoneToday
let currentDay = new Date(Date.now()).getDate();


let db = {
    countyTasks: models.countyTasksDoneToday,
    driverTasks: models.driverTaskSchema,
}


app = new App(process.env.PORT || 8000, db)

app.use(routers.defaultRouter)

app.useAuth((req) => {
    let token = null;

    if (req.headers)
        if (req.headers.cookie)
            token = req.headers.cookie.split('=')[1];

    if (req.body)
        if (req.body.token)
            token = req.body.token

    if (token == null)
        return req

    let decoded = jwt_decode(token);
    if (decoded.results != undefined) {
        req.accountId = decoded.results.id;
        req.accountType = decoded.results.type;
    }
    else if (decoded.body != undefined) {
        req.accountId = decoded.body.id;
        req.accountType = decoded.body.type;
    }
    req.token = token;
    return req;
})
app.listen();


// models.driverTaskSchema.insertMany([
//     {
//         "id": 1,
//         "car": "is05www",
//         "county": "Iași",
//         "task": "Livrare / preluare colete national",
//         "countySource": "Iași",
//         "countyDestination": "Baza Nationala Brasov",
//         "toDeliver": [
//             10,
//             9,
//             8
//         ],
//         "toPickup": [
//             18,
//             17,
//             16,
//             15,
//             14,
//             13,
//             12
//         ]
//     },
//     {
//         "id": 2,
//         "car": "is07eee",
//         "county": "Iași",
//         "task": "Livrare / preluare colete local",
//         "countySource": "Iași",
//         "countyDestination": "Iași",
//         "toDeliver": [
//             5,
//             1
//         ],
//         "toPickup": [
//             11,
//             6,
//             4,
//             3,
//             2
//         ]
//     }
// ])

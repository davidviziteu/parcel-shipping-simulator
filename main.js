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

models.countyTasksDoneToday.findOne({ county: 'Iași', dayOfWeek: currentDay }).then(res => {
    console.log(res);
    console.log(currentDay);
})

let db = {
    countyTasks: models.countyTasksDoneToday,
    driverTasks: models.driverTaskSchema,
}
app = new App(process.env.PORT || 8000, db)

app.use(routers.defaultRouter)

app.useAuth((req) => {
    let token;
    if (!req.headers.cookie) {
        return req;
    }
    else
        token = req.headers.cookie.split('=')[1];

    if (req.body)
        if (req.body.token)
            token = req.body.token


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

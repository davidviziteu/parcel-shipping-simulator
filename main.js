const http = require(`http`)
const jwt_decode = require('jwt-decode');
const routers = require(`./routes`)
const { App } = require(`./utils/app.js`)
const mongoose = require('mongoose');
const driverTaskSchema = require('./models/driverTaskSchema');

require("dotenv").config();


mongoose
    .connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to database')
    });


app = new App(process.env.PORT || 8000, driverTaskSchema)


app.useAuth((req) => {
    if (!req.body.token)
        return req;
    const token = req.body.token
    var decoded = jwt_decode(token);
    if (decoded.results != undefined) {
        req.accountId = decoded.results.id;
        req.accountType = decoded.results.type;
    }
    else if (decoded.body != undefined) {
        req.accountId = decoded.body.id;
        req.accountType = decoded.body.type;
    }
    return req;
})
app.listen();

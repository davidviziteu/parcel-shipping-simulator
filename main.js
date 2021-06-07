const http = require(`http`)
const jwt_decode = require('jwt-decode');
const db = require("./config/database")
const routers = require(`./routes`)
const { App } = require(`./utils/app.js`);
const { wakeUpMicroservices } = require('./utils/routines');
require("dotenv").config();


app = new App(process.env.PORT || 4000, db)
app.use(routers.adminRouter)
app.use(routers.clientRouter)
app.use(routers.driverRouter)
app.use(routers.employeeRouter)
app.use(routers.commonRouter)
app.use(routers.privateRouter)

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

    if (decoded.platform != req.headers.platform || decoded.appversion != req.headers.appversion)
        return req;
    req.accountId = decoded.results.id;
    req.accountType = decoded.results.type;
    req.authData = decoded.results
    req.token = token;
    return req;
})
app.listen();

wakeUpMicroservices();
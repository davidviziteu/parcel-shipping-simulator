const http = require(`http`)
const jwt_decode = require('jwt-decode');
const db = require("./config/database")
const routers = require(`./routes`)
const { App } = require(`./utils/app.js`)
require("dotenv").config();


app = new App(process.env.PORT || 4000, db)
app.use(routers.adminRouter)
app.use(routers.clientRouter)
app.use(routers.driverRouter)
app.use(routers.employeeRouter)
app.use(routers.commonRouter)

app.useAuth((req) => {
    if (!req.headers.cookie)
        return req;
    const token = req.headers.cookie.split('=')[1];
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

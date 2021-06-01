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
app.use(routers.privateRouter)

app.useAuth((req) => {
    if (!req.headers.cookie && !req.body.token)
        return req;
    let token;
    if (req.headers.cookie)
        token = req.headers.cookie.split('=')[1];
    else
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

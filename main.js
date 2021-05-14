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
    console.log(token);
    var decoded = jwt_decode(token);
    console.log(decoded);
    return req;

})
console.log(app)
app.listen()
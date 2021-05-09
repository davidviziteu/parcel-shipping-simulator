const http = require(`http`)
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
app.listen()
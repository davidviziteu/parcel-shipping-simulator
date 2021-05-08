const http = require(`http`)
const pool = require("./config/database")
// const dbFunctions = require(`model/models.js`)
const routers = require(`./routes`)
const { App } = require(`./utils/app.js`)
require("dotenv").config();



app = new App(process.env.PORT || 4000)
app.use(routers.adminRouter)
app.use(routers.clientRouter)
app.use(routers.driverRouter)
app.use(routers.employeeRouter)
app.use(routers.commonRouter)
// app.addDb(dbFunctions)
console.log(app)
app.listen()
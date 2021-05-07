const http = require(`http`)
const pool = require("./config/database")
const { router } = require(`./routes/common.js`)
const routerClient = require(`./routes/client.js`)
const { App } = require(`./utils/app.js`)
require("dotenv").config();


app = new App((process.env.PORT || 4000), router)
app.use(router)
app.use(routerClient)
app.listen()
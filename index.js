const http = require(`http`)
const pool = require("./config/database")
let { Router } = require(`./router/router.js`)
require("dotenv").config();

app = new Router()
app.get(`/`, function (req, res) {
    if (req.data) {
        responsObj = { "error": req.data.error }
        return res.end(JSON.stringify(responsObj))
    }
    res.end(`merge`)
})

const server = http.createServer((req, res) => {
    console.log("new client")
    app.handleClient(req, res)
})
server.listen(4000, () => {
    console.log("listening")
})



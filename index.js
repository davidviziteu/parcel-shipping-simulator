const http = require(`http`)
const pool = require("./config/database")
let { Router } = require(`./router/router.js`)
require("dotenv").config();

app = new Router()
app.get(`/`, function(req, res) {
        console.log(`request data: ${req.data.test}`)
        if (req.data.error) {
            responsObj = { "error": req.data.error }
            return res.end(JSON.stringify(responsObj))
        }
        res.end(`merge`)
    })
    // const db = mysql.createConnection({
    //     host: 'eu-cdbr-west-01.cleardb.com',
    //     user: 'b376e1b1de47f5',
    //     password: '6cf54c58',
    //     database: 'heroku_8d3aa76b4fe063d'
    // });
    // db.connect((err) => {
    //     if (err) {
    //         throw err;
    //     }
    //     console.log('Data base connected')
    // })


const server = http.createServer((req, res) => {
    console.log("new client")
    app.handleClient(req, res)
})
server.listen(4000, () => {
    console.log("listening")
})


let getRoutes = {}

getRoutes["/"] = function(req, res) {
    res.end(`merge`)
}


// console.log(getRoutes)
console.log(getRoutes["//"])
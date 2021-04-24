const http = require(`http`)
let { Router } = require(`./router/router.js`)

app = new Router()
app.get(`/`, function (req, res) {
    console.log(`request data: ${req.data.test}`)
    if (req.data.error) {
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



let getRoutes = {}

getRoutes["/"] = function (req, res) {
    res.end(`merge`)
}


console.log(getRoutes)
console.log(getRoutes["//"])
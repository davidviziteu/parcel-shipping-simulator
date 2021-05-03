const http = require('http')
const { Router } = require('./router')


class App {
    port
    router

    constructor(port, router) {
        this.port = port
        this.router = new Router()
    }



    listen() {
        http.createServer(function (req, res) {
            res = this.addResponseFunctionalities(res)
            this.router.handleClient(req, res)

        }.bind(this)).listen(this.port)

        console.log(`app running on PORT: ${this.port}`)

    }
    use(router){
        this.router.getRoutes = {...this.router.getRoutes,...router.getRoutes}
        this.router.postRoutes = {...this.router.postRoutes,...router.postRoutes}
        this.router.deleteRoutes = {...this.router.deleteRoutes,...router.deleteRoutes}
        this.router.putRoutes = {...this.router.putRoutes,...router.putRoutes}

    }

    addResponseFunctionalities(res) {

        res.status = function (newStatusCode) {
            res.statusCode = newStatusCode
            return res
        }


        res.json = function (newJson) {
            res.write(JSON.stringify(newJson))
            return res
        }

        return res
    }
}

module.exports = { App }
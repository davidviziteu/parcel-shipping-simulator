const http = require('http')


class App {
    #port
    #router

    constructor(port, router) {
        this.#port = port
        this.#router = router
    }



    listen() {
        http.createServer(function (req, res) {
            res = this.#addResponseFunctionalities(res)
            this.#router.handleClient(req, res)

        }.bind(this)).listen(this.#port)

        console.log(`app running on PORT: ${this.#port}`)

    }

    #addResponseFunctionalities(res) {

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
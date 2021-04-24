const qs = require(`querystring`)

class Router {
    #postRoutes
    #getRoutes
    #deleteRoutes
    #putRoutes

    constructor() {
        this.#postRoutes = {}
        this.#getRoutes = {}
        this.#deleteRoutes = {}
        this.#putRoutes = {}
    }

    post(url, controller) {
        if (this.#postRoutes[url])
            console.error(`route ${url} was already added as POST route`)
        this.#postRoutes[url] = controller
    }
    get(url, controller) {
        if (this.#getRoutes[url])
            console.error(`route ${url} was already added as GET route`)
        this.#getRoutes[url] = controller
    }
    delete(url, controller) {
        if (this.#deleteRoutes[url])
            console.error(`route ${url} was already added as DELETE route`)
        this.#deleteRoutes[url] = controller
    }
    put(url, controller) {
        if (this.#putRoutes[url])
            console.error(`route ${url} was already added as PUT route`)
        this.#putRoutes[url] = controller
    }
    handleRoute(req, res) {
        var reqUrl = req.url.split(`?`)[0]
        // req.data = this.#handleIncomingData(req, res)
        try {
            switch (req.method) {
                case "POST": break;
                case "GET":
                    this.#getRoutes[reqUrl](req, res)
                    break;
                case "DELETE": break;
                case "PUT": break;
                default:
                    break;
            }
        } catch (error) {
            console.log(error)
            this.#handleUnkownRoute(req, res)
        }
    }
    #handleUnkownRoute = function (req, res) {
        res.statusCode = 404
        res.end(`Unknown route`)
    }

    handleClient = function (req, res) {
        let data = '';
        console.log(`req handle data`)
        req.on('data', chunk => {
            data += chunk
            if (data.length > 1e6)
                req.connection.destroy()
        })
        req.on('end', function () {
            let finalData = {}
            try {
                finalData = JSON.parse(data)
                req.data = finalData

            } catch (err) {
                console.log(err)
                finalData.error = err
                req.data = finalData
            }
            this.handleRoute(req, res)
        }.bind(this))
        req.on('error', function (err) {
            console.error(err)
            // this.#handleUnknownRoute ????????????
        }.bind(this))
    }

}

module.exports = { Router }
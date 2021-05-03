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
        if (req.error) {
            console.log(error)
            //trimite si ceva la client...
            req.end(`data transfer error`)
        }
        
        var reqUrl = req.url.split(`?`)[0]
        try {
            switch (req.method) {
                case "POST":
                    this.#postRoutes[reqUrl](req, res)
                    break;
                case "GET":
                    this.#getRoutes[reqUrl](req, res)
                    break;
                case "DELETE":
                    this.#deleteRoutes[reqUrl](req, res)
                    break;
                case "PUT":
                    this.#putRoutes[reqUrl](req, res)
                    break;
                default:
                    this.#handleUnkownRoute(req, res, `unknown unknown method`)
                    break;
            }
        } catch (error) {
            console.log(error)
            this.#handleUnkownRoute(req, res, `unknown route`)
        }
    }


    #handleUnkownRoute = function (req, res, message) {
        res.statusCode = 404
        res.end(message)
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
            if (data)
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
            req.error = err;
            this.handleRoute(req, res)
        }.bind(this))
    }

}

module.exports = { Router }
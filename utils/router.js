const qs = require(`querystring`)

class Router {
    postRoutes
    getRoutes
    deleteRoutes
    putRoutes

    constructor() {
        this.postRoutes = {} //new Map(string, functie)
        this.getRoutes = {}
        this.deleteRoutes = {}
        this.putRoutes = {}
    }


    //controller ul este o functie (lambda, cu nume, nu conteaza)
    post(url, controller) {
        if (this.postRoutes[url])
            console.error(`route ${url} was already added as POST route`)
        this.postRoutes[url] = controller
    }
    get(url, controller) {
        if (this.getRoutes[url])
            console.error(`route ${url} was already added as GET route`)
        this.getRoutes[url] = controller
    }
    delete(url, controller) {
        if (this.deleteRoutes[url])
            console.error(`route ${url} was already added as DELETE route`)
        this.deleteRoutes[url] = controller
    }
    put(url, controller) {
        if (this.putRoutes[url])
            console.error(`route ${url} was already added as PUT route`)
        this.putRoutes[url] = controller
    }

    handleRoute(req, res) {
        if (req.error) {
            console.log(error)
            //trimite si ceva la client...
            return res.status(500).json({
                success: false,
                message: "Data transfer error!"
            });
        }

        var reqUrl = req.url.split(`?`)[0]
        try {
            switch (req.method) {
                case "POST":
                    return this.postRoutes[reqUrl](req, res)
                    break;
                case "GET":
                    return this.getRoutes[reqUrl](req, res)
                    break;
                case "DELETE":
                    return this.deleteRoutes[reqUrl](req, res)
                    break;
                case "PUT":
                    return this.putRoutes[reqUrl](req, res)
                    break;
                default:
                    throw new Error(`no route with such http verb`)
                    break;
            }
        } catch (error) {
            console.error(error)
            return res.status(400).json({
                success: false,
                error: error.message,
            });
        }

    }

    // getGetRoutes(){return this.getRoutes;}
    // getPostRoutes(){return this.postRoutes;}
    // getDeleteRoutes(){return this.deleteRoutes;}
    // getPutRoutes(){return this.putRoutes;}
}

module.exports = { Router }
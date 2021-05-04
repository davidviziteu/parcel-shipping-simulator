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
                console.log("handle client")
                let data = '';
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
                            console.log(err.message)
                            finalData.error = err
                            req.data = finalData
                        }
                    res = this.router.handleRoute(req, res)
                    res.end()
                }.bind(this))
                req.on('error', function (err) {
                    console.error(err.message)
                    req.error = err;
                    this.router.handleRoute(req, res)
                }.bind(this))

        }.bind(this)).listen(this.port)
         

        console.log(`app running on PORT: ${this.port}`)
        

    }
    use(router){
        console.log("use function")
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
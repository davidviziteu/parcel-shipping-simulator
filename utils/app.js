const http = require('http')
const { Router } = require('./router')
const fs = require('fs');


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

            if (handleStatic(req, res)) return

            console.log(`handle client on url: ${req.url}`)
            let data = '';
            req.on('data', chunk => {
                data += chunk
                if (data.length > 1e6) {
                    req.connection.destroy()
                    res.status(413).json({
                        error: `Payload too large`
                    })
                    res.end()
                }

            })
            req.on('end', function () {
                let finalData = {}
                if (data)
                    try {
                        finalData = JSON.parse(data)
                        req.data = finalData
                    } catch (err) {
                        //daca nu reusim sa parsam body ul de la client, ii spunem eroarea si inchidem conexiunea
                        console.error(`error parsing json from client: `)
                        console.error(err)
                        res.status(400).json({
                            success: false,
                            error: err.message
                        })
                        res.end()
                        return
                    }
                res = this.router.handleRoute(req, res)
                if (res.endNow)
                    res.end()
            }.bind(this))
            req.on('error', function (err) {
                console.error(err.message)
                req.json({
                    success: false,
                    error: err.message
                });
                req.end();
            }.bind(this))

        }.bind(this)).listen(this.port)


        console.log(`app running on PORT: ${this.port}`)


    }
    use(router) {
        this.router.getRoutes = { ...this.router.getRoutes, ...router.getRoutes }
        this.router.postRoutes = { ...this.router.postRoutes, ...router.postRoutes }
        this.router.deleteRoutes = { ...this.router.deleteRoutes, ...router.deleteRoutes }
        this.router.putRoutes = { ...this.router.putRoutes, ...router.putRoutes }
    }


    addResponseFunctionalities(res) {

        res.endNow = true; //flag pt cand folosim callbacks

        res.status = function (newStatusCode) {
            res.statusCode = newStatusCode
            return res
        }


        res.json = function (newJson) {
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify(newJson))
            return res
        }

        res.sendFile = function (filePath) {
            try {
                var stat = fs.statSync(filePath);
                res.setHeader('Content-Type', 'text/html');
                res.setHeader('Content-Length', stat.size);
                // fs.createReadStream(filePath).pipe(res);
                fs.readFile(filePath, (err, data) => {
                    if (err) {
                        //idk
                    }
                    res.write(data);
                    res.end()
                })
                console.log(filePath)
                res.endNow = false // nu a dat eroare dar se trimite fisierul
            } catch (err) {
                console.log(err)
            }
            return res
        }

        return res
    }
}

module.exports = { App }
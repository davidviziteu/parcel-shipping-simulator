const http = require('http')
const { Router } = require('./router')
const fs = require('fs');
const path = require('path');
const url = require('url');

class App {
    port
    router
    db

    constructor(port, db) {
        this.port = port
        this.db = db
        this.router = new Router()
    }

    isRestAPI = (url) => String(url).startsWith(`/api`)

    listen() {
        http.createServer(function (req, res) {

            res.setHeader('Access-Control-Allow-Origin', '*');
            //res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
            res.setHeader('Access-Control-Max-Age', 2592000);
            res = this.addResponseFunctionalities(res)
            req = this.addRequestFunctionalities(req)

            if (!this.isRestAPI(req.url)) { //nume prost ales pt functia aia
                res = this.handleStatic(req, res)
                // if (res.endNow)
                //     res.end()
                return
            }

            console.log(`${req.method} ${req.url}`)

            let data = '';
            req.on('data', chunk => {
                data += chunk
                if (data.length > 1e6) {
                    req.connection.destroy()
                    res.status(413).json({
                        error: `Payload too large`
                    })
                    // res.end()
                }

            })
            req.on('end', function () {
                let finalData = {}
                if (data)
                    try {
                        finalData = JSON.parse(data)
                        req.body = finalData
                    } catch (err) {
                        //daca nu reusim sa parsam body ul de la client, ii spunem eroarea si inchidem conexiunea
                        console.error(`error parsing json from client: `)
                        console.error(err)
                        res.status(400).json({
                            success: false,
                            error: err.message
                        })
                        // res.end()
                        return
                    }
                res = this.router.handleRoute(req, res)
                // if (res.endNow)
                //     res.end()
            }.bind(this))
            req.on('error', function (err) {
                console.error(err.message)
                req.json({
                    success: false,
                    error: err.message
                });
                // req.end();
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

        // res.endNow = true; //useless now

        res.status = function (newStatusCode) {
            res.statusCode = newStatusCode
            return res
        }


        res.json = function (newJson) {
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify(newJson))
            res.end()
            return res
        }

        res.sendFile = async function (filePath) {

            const map = {
                '.ico': 'image/x-icon',
                '.html': 'text/html',
                '.js': 'text/javascript',
                '.json': 'application/json',
                '.css': 'text/css',
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.wav': 'audio/wav',
                '.mp3': 'audio/mpeg',
                '.svg': 'image/svg+xml',
                '.pdf': 'application/pdf',
                '.doc': 'application/msword'
            };
            try {

                // based on the URL path, extract the file extention. e.g. .js, .doc, ...
                const extension = path.parse(filePath).ext;
                var stat = await fs.promises.stat(filePath)
                if (!stat.isFile) {
                    return res.status(400).json({
                        error: `bad request. not a file`
                    })
                }
                else {
                    var data = await fs.promises.readFile(filePath)
                    res.setHeader('Content-type', map[extension] || 'text/plain');
                    res.setHeader('Content-length', stat.size);
                    res.write(data)
                    res.end()
                }
            } catch (err) {
                console.error(err)
                if (err.code == 'ENOENT') //ENOENT = ERROR NO ENTITY
                    return res.status(404).json({
                        error: err.message,
                        path: filePath
                    })

                //altfel e alta eraore. fie de la stat, fie de la readFile
                return res.status(500).json({
                    error: err.message,
                    path: filePath
                })
            }
            // res.endNow = false
            return res
        }

        //end of functionalities
        return res
    }

    addRequestFunctionalities(req) {
        if (this.db)
            req.db = this.db
        return req
    }

    handleStatic(req, res) {
        // parse URL
        const parsedUrl = url.parse(req.url)
        // extract URL path
        let pathname = `${parsedUrl.pathname}`
        if (pathname == `/`)
            return res.sendFile(`public/landingPage.html`)
        else
            return res.sendFile(`public` + pathname)

    }
}

module.exports = { App }
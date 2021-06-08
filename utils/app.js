const http = require('http')
const { Router } = require('./router')
const fs = require('fs');
const path = require('path');
const url = require('url');
const { func } = require('joi');
const { StatusCodes } = require('http-status-codes');

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
            res.setHeader('Access-Control-Allow-Origin', 'origin');
            res.setHeader('Access-Control-Allow-Credentials', true);
            res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
            res.setHeader('Access-Control-Allow-Headers', 'Accept,Content-Type,platform,appVersion');
            res.setHeader('Content-Security-Policy', `default-src 'self' google.com *.google.com`);
            res.setHeader('Access-Control-Max-Age', 2592000);
            res = this.addResponseFunctionalities(res)
            req = this.addRequestFunctionalities(req)
            req = this.authFunction(req);
            if (!this.isRestAPI(req.url)) {
                res = this.handleStatic(req, res)

                return
            }
            console.log(`${req.method} on ${req.url}`)


            if (!req.headers['content-type']) {
                res = this.router.handleRoute(req, res)
                return
            }
            if (req.headers['content-type'] == "application/octet-stream") {

                let filename = req.headers[`content-disposition`].split('=')[1]
                const writeStream = fs.createWriteStream(`./uploadedFiles/${filename}`)
                req.on('data', chunk => {
                    writeStream.write(chunk)
                })
                req.on('end', function () {
                    writeStream.end()
                    req.filename = filename;
                    req.filePath = `./uploadedFiles/${filename}`;
                    this.router.handleRoute(req, res)
                }.bind(this))
                req.on('error', function (err) {
                    writeStream.end()
                    fs.unlink(`./uploadedFiles/${filename}`)
                    res.status(StatusCodes.EXPECTATION_FAILED).json({
                        error: err.message
                    })
                }.bind(this))

            } else if (req.headers['content-type'] == "application/json") {
                let data = '';
                req.on('data', chunk => {
                    data += chunk
                    if (data.length > 1e6) {
                        req.connection.destroy()
                        res.status(413).json({
                            error: `Payload too large`
                        })
                        return
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
                            return
                        }
                    req = this.authFunction(req);
                    res = this.router.handleRoute(req, res)

                }.bind(this))
                req.on('error', function (err) {
                    console.error(err.message)
                    req.status(StatusCodes.EXPECTATION_FAILED).json({
                        success: false,
                        message: `body data transfer error`,
                        ...sendDebugInResponse && { error: err.message }
                    });
                }.bind(this))
            } else {
                res.status(415).json({
                    error: `Invalid Content Type Header`
                })
                req.connection.destroy()
            }
        }.bind(this)).listen(this.port)


        console.log(`app running on PORT: ${this.port}`)


    }
    use(router) {
        this.router.getRoutes = { ...this.router.getRoutes, ...router.getRoutes }
        this.router.postRoutes = { ...this.router.postRoutes, ...router.postRoutes }
        this.router.deleteRoutes = { ...this.router.deleteRoutes, ...router.deleteRoutes }
        this.router.putRoutes = { ...this.router.putRoutes, ...router.putRoutes }
        this.router.patchRoutes = { ...this.router.patchRoutes, ...router.patchRoutes }
    }
    useAuth(authentication) {
        this.authFunction = authentication;
    }

    addResponseFunctionalities(res) {


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

            try {

                // based on the URL path, extract the file extention. e.g. .js, .doc, ...
                const extension = path.parse(filePath).ext;
                console.log(extension)
                var stat = await fs.promises.stat(filePath)
                if (!stat.isFile) {
                    return res.status(StatusCodes.BAD_REQUEST).json({
                        error: `bad request. not a file`
                    })
                } else {
                    res.statusCode = StatusCodes.OK;
                    res.setHeader('Content-type', 'text/csv');
                    res.setHeader('Content-length', stat.size);
                    var data = fs.createReadStream(filePath).pipe(res)


                }
            } catch (err) {
                console.error(err)
                if (err.code == 'ENOENT') //ENOENT = ERROR NO ENTITY
                    return res.status(StatusCodes.NOT_FOUND).json({
                        error: err.message,
                        path: filePath
                    })

                //altfel e alta eraore. fie de la stat, fie de la readFile
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    ...sendDebugInResponse && { error: err.message },
                    path: filePath
                })
            }
            // res.endNow = false
            return res
        }
        res.sendStaticFile = async function (filePath) {

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
                    return res.status(StatusCodes.BAD_REQUEST).json({
                        error: `bad request. not a file`
                    })
                } else {
                    var data = await fs.promises.readFile(filePath)
                    res.setHeader('Content-type', map[extension] || 'text/plain');
                    res.setHeader('Content-length', stat.size);
                    res.write(data)
                    res.end()
                }
            } catch (err) {
                console.error(err)
                if (err.code == 'ENOENT') //ENOENT = ERROR NO ENTITY
                    return res.status(StatusCodes.NOT_FOUND).json({
                        error: err.message,
                        path: filePath
                    })

                //altfel e alta eraore. fie de la stat, fie de la readFile
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    ...sendDebugInResponse && { error: err.message },
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
        req.parameters = url.parse(req.url, true).query
        // console.log(`request params: ${JSON.stringify(req.parameters)}`)
        if (this.db)
            req.db = this.db
        return req
    }

    handleStatic(req, res) {
        // parse URL
        const parsedUrl = url.parse(req.url)
        // extract URL path

        let pathname = `${parsedUrl.pathname}`
        let joinedpath = path.join(`public`, pathname);
        // console.log(`joined path`, joinedpath); //joined path public
        if (!joinedpath.startsWith("public"))
            return res.status(StatusCodes.FORBIDDEN).json({
                success: false,
            })

        if (pathname == `/`) {
            if (!req._staticRedirect)
                return res.sendStaticFile(`public/landingPage.html`)
            return res.sendStaticFile(`public/dashboard-${req._staticRedirect}.html`)
        } else
            if (pathname == `/landingPage.html`) {
                if (!req._staticRedirect)
                    return res.sendStaticFile(`public/landingPage.html`)
                return res.sendStaticFile(`public/dashboard-${req._staticRedirect}.html`)
            } else
                return res.sendStaticFile(`public` + pathname)

    }
}

module.exports = { App }
const { StatusCodes } = require(`http-status-codes`)
const models = require("../models")
const nodemailer = require('nodemailer');
const { hashSync, genSaltSync, compareSync } = require("bcrypt")
const fs = require('fs');


module.exports = {
    changePrice: (req, res) => {
        if (req.accountType != `admin`) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                error: "doar adminul poate executa aceasta comanda!"
            })
        }
        if (!req.body)
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: `missing body`
            })
        const { error, value } = models.adminModel.bestPrice.validate(req.body)
        if (error) {
            console.log(error.message)
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: error.message
            })
        }
        req.db.updateBestPrice(req.body.price, (err, results) => {
            if (err) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    err: err.message
                })
            } else res.status(StatusCodes.OK).json({
                success: true,
                data: "Pretul de bază a fost modificat cu succes!"
            })
        })
    },
    modifyCar: (req, res) => {
        if (req.accountType != `admin`) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                error: "Doar adminul poate executa aceasta comanda!"
            })
        }
        if (!req.body) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: `missing body`
            })
        }
        const { error, value } = models.carModel.modifyCarSchema.validate(req.body)
        if (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: error.message
            })
        }
        req.db.searchCar(req.body.registration_number, (err, results) => {
            if (err) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    err: err.message
                })
            } else if (!results) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    data: `Mașina nu există în baza de date.`
                })
            } else {
                req.db.modifyCar(req.body, (err, results) => {
                    if (err) {
                        res.status(StatusCodes.BAD_REQUEST).json({
                            success: false,
                            err: err.message
                        })
                    } else {
                        res.status(StatusCodes.OK).json({
                            success: true,
                            data: `Mașina a fost modificată cu succes.`
                        })
                    }
                })
            }
        })


    },
    addCar: (req, res) => {
        if (req.accountType != `admin`) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                error: "Doar adminul poate executa aceasta comanda!"
            })
        }
        if (!req.body) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: `missing body`
            })
        }
        const { error, value } = models.carModel.modifyCarSchema.validate(req.body)
        if (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: error.message
            })
        }
        req.db.searchCar(req.body.registration_number, (err, results) => {
            if (err) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    err: err.message
                })
            }
            if (results) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    data: "Mașina există deja în baza de date."
                })
            } else {
                req.db.searchDriverById(req.body.id_driver, (err, results) => {
                    if (err) {
                        res.status(StatusCodes.BAD_REQUEST).json({
                            success: false,
                            err: err.message
                        })
                    } else {
                        if (!results) {
                            res.status(StatusCodes.BAD_REQUEST).json({
                                success: false,
                                data: "Nu există niciun șofer înregistrat cu acest id."
                            })
                        } else {
                            req.db.addCar(req.body, (err, results) => {
                                if (err) {
                                    res.status(StatusCodes.BAD_REQUEST).json({
                                        success: false,
                                        err: err.message
                                    })
                                } else res.status(StatusCodes.OK).json({
                                    success: true,
                                    data: "Mașina a fost adaugată cu succes!"
                                })
                            })
                        }
                    }
                })
            }
        })

    },
    removeCar: (req, res) => {
        if (req.accountType != `admin`) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                error: "Doar adminul poate executa aceasta comanda!"
            })
        }
        if (!req.body) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: `missing body`
            })
        }
        const { error, value } = models.carModel.modifyCarSchema.validate(req.body)
        if (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: error.message
            })
        }
        req.db.searchCar(req.body.registration_number, (err, results) => {
            if (err) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    err: err.message
                })
            } else if (!results) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    data: `Mașina nu există în baza de date.`
                })
            } else {
                req.db.removeCar(req.body.registration_number, (err, results) => {
                    if (err) {
                        res.status(StatusCodes.BAD_REQUEST).json({
                            success: false,
                            err: err.message
                        })
                    } else {
                        res.status(StatusCodes.OK).json({
                            success: true,
                            data: `Mașina a fost eliminată cu succes.`
                        })
                    }
                })
            }
        })

    },
    changeDriver: (req, res) => {
        if (req.accountType != `admin`) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                error: "Doar adminul poate executa aceasta comanda!"
            })
        }
        if (!req.body) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: `missing body`
            })
        }
        const { error, value } = models.carModel.modifyCarSchema.validate(req.body)
        if (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: error.message
            })
        }
        req.db.searchCar(req.body.registration_number, (err, results) => {
            if (err) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    err: err.message
                })
            } else if (!results) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    data: `Mașina nu există în baza de date.`
                })
            } else {
                req.db.searchDriverById(req.body.id_driver, (err, results) => {
                    if (err) {
                        res.status(StatusCodes.BAD_REQUEST).json({
                            success: false,
                            err: err.message
                        })
                    } else if (!results) {
                        res.status(StatusCodes.BAD_REQUEST).json({
                            success: false,
                            data: "Nu există niciun șofer înregistrat cu acest id."
                        })
                    } else {
                        req.db.changeDriver(req.body, (err, results) => {
                            if (err) {
                                res.status(StatusCodes.BAD_REQUEST).json({
                                    success: false,
                                    err: err.message
                                })
                            } else {
                                res.status(StatusCodes.OK).json({
                                    success: true,
                                    data: "Șoferul mașinii a fost schimbat cu succes!"
                                })
                            }
                        })
                    }
                })
            }
        })

    },

    addNotification: (req, res) => {
        if (req.accountType != `admin`)
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                error: "doar adminul poate executa aceasta comanda!"

            })
        if (!req.body)
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: `missing body`
            })

        const { error, value } = models.notificationModel.newNotificationSchema.validate(req.body)
        if (error)
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: error
            })
        if (!req.body.expiry_date)
            req.body.expiry_date = null
        req.db.addNotification(req.body, (err, results) => {
            if (err) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    err: err.message
                })
            } else res.status(StatusCodes.OK).json({
                success: true,
                data: "notificarea a fost adaugata cu succes!"
            })
        })
    },
    deleteNotification: (req, res) => {

        if (req.accountType == `admin`) {
            if (!req.body)
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    error: `missing body`
                })
            const { error, value } = models.notificationModel.deleteNotificationSchema.validate(req.body)
            if (error)
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    error: error
                })
            req.db.searchNotification(req.body.id, (err, results) => {
                if (err) {
                    res.status(StatusCodes.BAD_REQUEST).json({
                        success: false,
                        err: err.message
                    })
                } else if (!results) {
                    res.status(404).json({
                        success: false,
                    })
                } else {
                    req.db.deleteNotification(req.body.id, (err, results) => {
                        if (err) {
                            res.status(StatusCodes.BAD_REQUEST).json({
                                success: false,
                                err: err.message
                            })
                        } else res.status(StatusCodes.OK).json({
                            success: true,
                            message: "Notificarea a fost stearsa cu succes!"
                        })
                    })
                }
            })
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({
                success: 0,
                error: "doar adminul poate executa aceasta comanda!"
            })
        }
    },
    getInfoUser: (req, res) => {
        if (req.accountType == `admin`) {
            if (!req.body)
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    error: `missing body`
                })
            body = req.parameters
            const { error, value } = models.adminModel.validationEmail.validate(body)
            if (error) {
                return res.status(200).json({
                    success: false,
                    error: error.message
                })
            }
            req.db.getUserByEmail(body.email, (error, results) => {
                if (error) {
                    res.status(200).json({
                        success: false,
                        error: error.message
                    })
                } else if (results != undefined) {
                    res.status(200).json({
                        success: true,
                        id: results.id,
                        surname: results.surname,
                        name: results.name,
                        phone: results.phone
                    })
                } else {
                    res.status(StatusCodes.NOT_FOUND).json({
                        success: false
                    })
                }
            })
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({
                success: 0,
                error: "doar adminul poate executa aceasta comanda!"
            })
        }
    },
    deleteAccount: (req, res) => {
        if (req.accountType == `admin`) {
            if (!req.body)
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    error: `missing body`
                })
            body = req.body
            const { error, value } = models.adminModel.validationEmail.validate(body)
            if (error) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    error: error.message
                })
            }
            req.db.getUserByEmail(body.email, (error, results) => {
                if (error) {
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                        success: false,
                        error: error.message
                    })
                } else if (results != undefined) {
                    req.db.deleteAccount(body.email, (error, results) => {
                        if (error) {
                            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                                success: false,
                                error: error.message
                            })
                        } else {
                            res.status(200).json({
                                success: true
                            })
                        }
                    })
                } else {
                    res.status(StatusCodes.NOT_FOUND).json({
                        success: false,
                        error: "not exist"
                    })
                }
            })
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({
                success: 0,
                error: "doar adminul poate executa aceasta comanda!"
            })
        }
    },
    getInfoCounty: (req, res) => {
        if (req.accountType == `admin`) {
            if (!req.body)
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    error: `missing body`
                })
            body = req.body
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({
                success: 0,
                error: "doar adminul poate executa aceasta comanda!"
            })
        }
    },
    getDbTables: (req, res) => {
        if (req.accountType == `admin`) {
            req.db.getAllTables((error, results) => {
                results = results.map(r => r.TABLE_NAME)
                if (error) {
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                        success: false,
                        error: error.message
                    })
                } else {
                    res.status(StatusCodes.OK).json({
                        success: true,
                        message: results
                    })
                }
            })
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({
                success: 0,
                error: "doar adminul poate executa aceasta comanda!"
            })
        }
    },
    uploadFiles: (req, res) => {
        if (req.accountType == `admin`) {
            console.log(req.filePath)
            fs.readFile(req.filePath, 'utf8', function(err, data) {
                console.log(data)
            })
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({
                success: 0,
                error: "doar adminul poate executa aceasta comanda!"
            })
        }
    },
    downloadFiles: (req, res) => {
        if (req.accountType == `admin`) {
            req.db.getDataFromTable(req.parameters.table, (error, results, fields) => {
                if (error) {
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                        success: false,
                        error: error.message
                    })
                } else {
                    res.setHeader('Content-type', 'octet/stream');
                    res.setHeader('Content-dispositon', 'filename=test.csv');
                    let writeStream = fs.createWriteStream(`./uploadedFiles/${req.parameters.table}.csv`);
                    results.forEach(line => {
                        var last = null;
                        let entries = Object.entries(line);
                        for (let [index, [key, value]] of entries.entries()) {
                            if (index + 1 == Object.keys(line).length) {
                                last = value;
                                break;
                            }

                            writeStream.write(value + ',')
                        }
                        writeStream.write(last)
                        writeStream.write('\n')

                    });
                    writeStream.end();
                }
            })

        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({
                success: 0,
                error: "doar adminul poate executa aceasta comanda!"
            })
        }
    }
}
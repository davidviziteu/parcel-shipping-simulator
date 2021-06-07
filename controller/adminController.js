const { StatusCodes } = require(`http-status-codes`)
const models = require("../models")
const nodemailer = require('nodemailer');
const { hashSync, genSaltSync, compareSync } = require("bcrypt")
const fs = require('fs');
const { sendDebugInResponse } = require("../models/apiModel");

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
                ...sendDebugInResponse && { error: error.message }
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
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    error: error.message
                })
            }
            req.db.getUserByEmail(body.email, (error, results) => {
                if (error) {
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                        success: false,
                        ...sendDebugInResponse && { error: error.message }
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
                        ...sendDebugInResponse && { error: error.message }
                    })
                } else if (results != undefined) {
                    req.db.deleteAccount(body.email, (error, results) => {
                        if (error) {
                            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                                success: false,
                                ...sendDebugInResponse && { error: error.message }
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
                        ...sendDebugInResponse && { error: error.message }
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
            console.log(req.parameters.table)
            fs.readFile(req.filePath, 'utf8', function (err, data) {
                console.log(data)
                var rows = data.split(`\n`)
                console.log(rows)
                var statusCode = StatusCodes.OK;
                for (let index = 0; index < rows.length; index++) {
                    // const element = array[index];
                    const row = rows[index];
                    if (row.length == 0) continue;
                    const fields = row.split(`,`);
                    req.db.insertIntoTable(req.parameters.table, fields, (error, results) => {
                        if (error) {
                            statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
                            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                                success: false,
                                ...sendDebugInResponse && { error: error.message }
                            })
                        }

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
    downloadFiles: (req, res) => {
        if (req.accountType == `admin`) {
            req.db.getDataFromTable(req.parameters.table, (error, results, fields) => {
                if (error) {
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                        success: false,
                        ...sendDebugInResponse && { error: error.message }
                    })
                } else {
                    res.setHeader('Content-type', 'application/octet-stream');
                    res.setHeader('Content-disposition', `attachment;filename=${req.parameters.table}.csv`);
                    let writeStream = fs.createWriteStream(`./uploadedFiles/${req.parameters.table}.csv`);
                    results.forEach(line => {
                        var last = null;
                        let entries = Object.entries(line);
                        for (let [index, [key, value]] of entries.entries()) {
                            if (index + 1 == Object.keys(line).length) {
                                if (typeof value == 'string') {
                                    value = `"${value}"`
                                }
                                last = value.toString();
                                break;
                            }
                            if (value == null)
                                value = 'n/a';
                            else {
                                if (typeof value == 'string') {
                                    value = `"${value}"`
                                }
                            }
                            writeStream.write(value.toString() + ',')
                        }
                        writeStream.write(last)
                        writeStream.write('\n')

                    });
                    writeStream.end();
                    let readStream = fs.createReadStream(`./uploadedFiles/${req.parameters.table}.csv`)
                    readStream.pipe(res)
                    fs.unlink(`./uploadedFiles/${req.parameters.table}.csv`, () => {

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
    getInfoStatistics: (req, res) => {
        if (req.accountType == `admin`) {
            let current_datetime = new Date()
            let formatted_date = (current_datetime.getFullYear() - 1) + "-" + (current_datetime.getMonth() + 1);
            const data = {
                county: req.parameters.county,
                date: formatted_date
            }
            req.db.getInfoCounty(data, (error, results, fields) => {
                if (error) {
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                        success: false,
                        ...sendDebugInResponse && { error: error.message }
                    })
                }
                else {
                    const month = {
                        January: 0,
                        February: 0,
                        March: 0,
                        April: 0,
                        May: 0,
                        June: 0,
                        July: 0,
                        August: 0,
                        September: 0,
                        October: 0,
                        November: 0,
                        December: 0
                    }
                    for (let i = 0; i < results.length; i++) {
                        if (results[i].month.includes("-01")) month.January = results[i].count
                        else if (results[i].month.includes("-02")) month.February = results[i].count
                        else if (results[i].month.includes("-03")) month.March = results[i].count
                        else if (results[i].month.includes("-04")) month.April = results[i].count
                        else if (results[i].month.includes("-05")) month.May = results[i].count
                        else if (results[i].month.includes("-06")) month.June = results[i].count
                        else if (results[i].month.includes("-07")) month.July = results[i].count
                        else if (results[i].month.includes("-08")) month.August = results[i].count
                        else if (results[i].month.includes("-09")) month.August = results[i].count
                        else if (results[i].month.includes("-10")) month.October = results[i].count
                        else if (results[i].month.includes("-11")) month.November = results[i].count
                        else if (results[i].month.includes("-12")) month.December = results[i].count
                    }
                    return res.status(StatusCodes.OK).json({
                        success: true,
                        results: month
                    })
                }
            })
        }
        else {

            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: 0,
                error: "doar adminul poate executa aceasta comanda!"
            })
        }
    },
    getInfoStatisticsBadEvent: (req, res) => {
        if (req.accountType == `admin`) {
            let current_datetime = new Date()
            let formatted_date = (current_datetime.getFullYear() - 1) + "-" + (current_datetime.getMonth() + 1);
            const data = {
                date: formatted_date,
                event_type: req.parameters.event_type
            }
            console.log(data)
            req.db.getInfoDriverEvents(data, (error, results, fields) => {
                if (error) {
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                        success: false,
                        ...sendDebugInResponse && { error: error.message }
                    })
                }
                else {
                    const month = {
                        January: 0,
                        February: 0,
                        March: 0,
                        April: 0,
                        May: 0,
                        June: 0,
                        July: 0,
                        August: 0,
                        September: 0,
                        October: 0,
                        November: 0,
                        December: 0
                    }
                    for (let i = 0; i < results.length; i++) {
                        if (results[i].month.includes("-01")) month.January = results[i].count
                        else if (results[i].month.includes("-02")) month.February = results[i].count
                        else if (results[i].month.includes("-03")) month.March = results[i].count
                        else if (results[i].month.includes("-04")) month.April = results[i].count
                        else if (results[i].month.includes("-05")) month.May = results[i].count
                        else if (results[i].month.includes("-06")) month.June = results[i].count
                        else if (results[i].month.includes("-07")) month.July = results[i].count
                        else if (results[i].month.includes("-08")) month.August = results[i].count
                        else if (results[i].month.includes("-09")) month.August = results[i].count
                        else if (results[i].month.includes("-10")) month.October = results[i].count
                        else if (results[i].month.includes("-11")) month.November = results[i].count
                        else if (results[i].month.includes("-12")) month.December = results[i].count
                    }
                    return res.status(StatusCodes.OK).json({
                        success: true,
                        results: month
                    })
                }
            })
        }
        else {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: 0,
                error: "doar adminul poate executa aceasta comanda!"
            })
        }
    }
}
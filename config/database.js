const { compile } = require("joi");
const { createPool } = require("mysql");
require("dotenv").config();
const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    multipleStatements: true
});

// pool.query(`select * from users`, [], (error, results, fields) => {
//     console.log(results)
// })


module.exports = {
    getAwbEvents: (awb, callBack) => {
        if (!callBack)
            return new Promise((resolve, reject) => {
                pool.query(
                    `select 
                        awb,
                        event_type,
                        details,
                        employees_details,
                        DATE_FORMAT(date_time, '%d-%m-%Y %T') date_time
                    from awb_events where awb = ?`, [awb],
                    (error, results, fields) => {
                        if (error)
                            return reject(error);
                        if (!results[0])
                            return reject(`No such awb in db`)
                        return resolve(results);
                    }
                );
            })
        pool.query(
            `select 
                awb,
                event_type,
                details,
                employees_details,
                DATE_FORMAT(date_time, '%d-%m-%Y %T') date_time
            from awb_events where awb = ?`, [awb],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    setUserToken: (id, callBack) => {
        pool.query(
            `INSERT INTO tokens where id = ?`, [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    checkToken: (id, callBack) => {
        pool.query(
            `SELECT *FROM tokens where id = ?`, [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUserType: (id, callBack) => {
        pool.query(
            `SELECT type FROM users where id = ?`, [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUserByEmail: (email, callBack) => {
        pool.query(
            `select * from users where email = ?`, [email],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getTokens: (id, callBack) => {
        pool.query(
            `select * from tokens where id = ?`, [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    createAccount: (data, callBack) => {
        pool.query(
            `INSERT INTO USERS (name,surname,email,password,phone,type,county,city,address) VALUES (?,?,?,?,?,?,?,?,?)`, [
            data.name,
            data.surname,
            data.email,
            data.password,
            data.phone,
            data.type,
            data.county,
            data.city,
            data.address
        ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    insertIntoAwbEvents: (data, callBack) => {
        pool.query(
            `INSERT INTO awb_events (awb,event_type,details,date_time) VALUES (?,?,?,now())`, [
            data.awb,
            `order-received`,
            `Comanda a fost primită`

        ],
            (error, results, fields) => {
                if (error)
                    return callBack(error)
                return callBack(null, results, fields)
            }
        )

    },
    placeNewOrder: (data, callBack) => {
        pool.query(
            `INSERT INTO orders 
            (fullName_sender,contactPerson_sender,phone_sender,email_sender,county_sender,city_sender,address_sender,fullName_receiver,contactPerson_receiver,phone_receiver,county_receiver,city_receiver,address_receiver,nrEnvelope,nrParcel, weight,length,width,height,date, hour, preference1, preference2, preference3, payment, mentions) 
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);
            SELECT  LAST_INSERT_ID()`, [
            data.fullName_sender,
            data.contactPerson_sender,
            data.phone_sender,
            data.email_sender,
            data.county_sender,
            data.city_sender,
            data.address_sender,

            data.fullName_receiver,
            data.contactPerson_receiver,
            data.phone_receiver,
            data.county_receiver,
            data.city_receiver,
            data.address_receiver,

            data.nrEnvelope,
            data.nrParcel,
            data.weight,

            data.length,
            data.width,
            data.height,

            data.date,
            data.hour,

            data.preference1,
            data.preference2,
            data.preference3,

            data.payment,

            data.mentions

        ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[1])
            }
        );
    },
    addEventDriverEvent: (data, callBack) => {
        pool.query(
            `INSERT INTO driver_events values (?,?,now())`, [
            data.id,
            data.event_type
        ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
            }
        )
    },
    addNotification: (data, callBack) => {
        pool.query(
            `INSERT INTO notifications(expiry_date,text) values (?,?)`, [
            data.expiry_date,
            data.text,
        ],
            (error, results, fields) => callBack(error)
        )
    },

    deleteNotification: (id, callBack) => {
        pool.query(
            `DELETE FROM notifications WHERE id=(?)`, [
            id
        ],
            (error) => callBack(error)
        )
    },
    searchNotification: (id, callBack) => {
        pool.query(
            `SELECT * FROM notifications where id = ?`, [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },

    getNotifications: (callBack) => {
        pool.query(
            `SELECT id, DATE_FORMAT(expiry_date, '%d-%m-%Y') expiry_date,text FROM notifications`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getDetailsOrder: (awb, callBack) => {
        //promise wrapping
        if (!callBack)
            return new Promise((resolve, reject) => {
                pool.query(
                    `SELECT * FROM orders where awb = ?`, [
                    awb
                ],
                    (error, results, fields) => {
                        if (error)
                            return reject(error);
                        if (!results[0])
                            return reject(`No such awb in db`)
                        return resolve(results[0]);
                    }
                )
            })
        pool.query(
            `SELECT * FROM orders where awb = ?`, [
            awb
        ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    newCode: (data, callBack) => {
        console.log(data)
        pool.query(
            `INSERT INTO codes (id , expiry_date , type) values(?,LOCALTIME() + INTERVAL 15 MINUTE,?)`, [
            data.id,
            data.type
        ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    existCode: (id, callBack) => {
        pool.query(
            `SELECT * from codes where id=?`, [
            id
        ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },
    selectIdChange: (body, callBack) => {
        pool.query(
            `SELECT * from (select id from codes where code = ? and expiry_date > localtime() and type = ? order by expiry_date desc) AS T LIMIT 1`, [
            body.code,
            body.type
        ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },
    changePassword: (data, callBack) => {
        pool.query(
            `UPDATE users SET password = ? where id = ?`, [
            data.password,
            data.id
        ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },
    changeEmail: (data, callBack) => {
        pool.query(
            `UPDATE USERS SET email = ? where id = ?`, [
            data.email,
            data.id
        ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },
    deleteCode: (data, callBack) => {
        pool.query(
            `DELETE from codes where id = ? and code != ? and type =?`, [
            data.id,
            data.code,
            data.type
        ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },
    deleteAccount: (email, callBack) => {
        pool.query(
            `DELETE from users where email=?`, [
            email
        ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },
    searchCar: (registration_number, callBack) => {
        pool.query(
            `SELECT * from cars where registration_number=?`, [
            registration_number
        ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },
    addCar: (data, callBack) => {
        pool.query(
            `INSERT INTO cars (registration_number,id_driver,status) VALUES(?,?,?)`, [
            data.registration_number,
            data.id_driver,
            data.status
        ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    modifyCar: (data, callBack) => {
        pool.query(
            `UPDATE cars SET status = ? where registration_number = ?`, [
            data.status,
            data.registration_number
        ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    removeCar: (registration_number, callBack) => {
        pool.query(
            `DELETE FROM cars WHERE registration_number=?`, [
            registration_number
        ],
            (error) => callBack(error)
        )
    },
    updateBestPrice: (price, callBack) => {
        pool.query(
            `UPDATE price SET price = ?`, [
            price
        ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getBasePrice: (callBack) => {
        pool.query(
            `SELECT *FROM price`, [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    searchDriverById: (id, callBack) => {
        pool.query(
            `SELECT * from users where id=? AND type=?`, [
            id,
            `driver`
        ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },
    checkDriverCar: (data, callBack) => {
        pool.query(
            `SELECT * from cars where id_driver=? AND type=? AND registration_number=?`, [
            data.id,
            `driver`,
            data.registration_number
        ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },
    changeDriver: (data, callBack) => {
        pool.query(
            `UPDATE cars SET id_driver = ? where registration_number = ?`, [
            data.id_driver,
            data.registration_number
        ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },

    getAccountsByTypeAndByCounty: (type, county, callBack) => {
        //promise wrapping
        if (!callBack)
            return new Promise((resolve, reject) => {
                pool.query(
                    `SELECT * from users where type=? AND county=?`, [
                    type,
                    county
                ],
                    (error, results, fields) => {
                        if (error)
                            return reject(error)
                        return resolve(results)
                    }
                )
            })
        pool.query(
            `SELECT * from users where type=? AND county=?`, [
            type,
            county
        ],
            (error, results, fields) => {
                if (error)
                    return callBack(error)
                return callBack(null, results, fields)
            }
        )
    },
    getInfoCounty: (data, callBack) => {
        console.log(data)
        pool.query(
            `SELECT SUBSTR(date, 1, 7) as "month", count(*) as "count",county_sender FROM orders where SUBSTR(date, 1, 7) > ? and county_sender = ? GROUP BY SUBSTR(date, 1, 7) ORDER BY month`, [
            data.date,
            data.county
        ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results, fields)
            }
        )
    },
    getDriverCar: (id, callBack) => {
        pool.query(
            `SELECT cars.registration_number AS registration_number, users.name AS name, users.email AS email FROM cars JOIN users on users.id=cars.id_driver WHERE id_driver = ?`, [
            id
        ],
            (error, results, fields) => {
                if (error)
                    return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    getDriverCarCounty: (county, callBack) => {
        if (!callBack)
            return new Promise((resolve, reject) => {
                pool.query(
                    `SELECT users.id AS id  , users.county  AS county , cars.registration_number AS car from users JOIN cars on users.id = cars.id_driver where users.county = ?`, [
                    county
                ],
                    (error, results, fields) => {
                        if (error)
                            return reject(error);
                        return resolve(results);
                    }
                )
            })
        pool.query(
            `SELECT users.id AS id  , users.county  AS county , cars.registration_number AS car from users JOIN cars on users.id = cars.id_driver where users.county = ?`, [
            county
        ],
            (error, results, fields) => {
                if (error)
                    return callBack(error)
                return callBack(null, results)
            }
        )
    },
    newAWBEvent: (data, callBack) => {
        pool.query(
            `INSERT INTO awb_events values (?,?,?,?,now())`, [
            data.awb,
            data.event_type,
            data.details,
            data.employees_details
        ],
            (error, results, fields) => {
                if (error)
                    return callBack(error)
                return callBack(null, results[0])
            }
        )
    },
    updateStatusAWB: (data, callBack) => {
        pool.query(
            `UPDATE orders SET status=? where awb=?`, [
            data.status,
            data.awb
        ],
            (error, results, fields) => {
                if (error)
                    return callBack(error)
                return callBack(null, results[0])
            }
        )
    },


    getOrdersRelatedToCounty(county, callBack) {
        //TODO: VERIFICA SI PT CAND COLETUL ESTE IN BAZA NATIONALA
        let selectQuery =
            `SELECT awb, county_sender, county_receiver, status, DATE_FORMAT(date, '%Y-%m-%d') pickupDate
            from orders
            where (county_sender=? or county_receiver=?)
            and
            (status='order-received' or status='order-in-local-base-sender' or status='order-in-local-base-receiver' or status='order-in-national-base')`;
        if (!callBack)
            return new Promise((resolve, reject) => {
                pool.query(
                    selectQuery, [
                    county,
                    county
                ],
                    (error, results, fields) => {
                        if (error)
                            return reject(error)
                        return resolve(results)
                    }
                )
            })

        pool.query(
            selectQuery, [
            county,
            county
        ],
            (error, results, fields) => {
                if (error)
                    return callBack(error)
                return callBack(null, results)
            }
        )
    },
    getAllTables: (callBack) => {
        pool.query(
            `select TABLE_NAME FROM information_schema.TABLES WHERE table_schema=?`, [
            'heroku_8d3aa76b4fe063d'
        ],
            (error, results, fields) => {
                if (error)
                    return callBack(error)
                return callBack(null, results)
            }
        )
    },
    getLastAwbEvent(awb, callBack) {
        pool.query(
            `SELECT * from awb_events where awb = ? order by date_time desc LIMIT 1`, [
            awb
        ],
            (error, results, fields) => {
                if (error)
                    return callBack(error)
                return callBack(null, results)
            }
        )
    },
    insertIntoTable(tablename, data, callBack) {
        var sqlString = `INSERT INTO ?? VALUES(`;

        for (let index = 0; index < data.length; index++) {
            if (index == data.length - 1) {
                sqlString += '?';
                break;
            }
            sqlString += '?,';
        }
        sqlString += ')';
        data.unshift(tablename)
        console.log(data)
        pool.query(
            sqlString, data,
            (error, results, fields) => {
                if (error)
                    return callBack(error)
                return callBack(null, results)
            }
        )
    },
    getDataFromTable: (table, callBack) => {
        pool.query(
            `SELECT * FROM ??`, [
            table
        ],
            (error, results, fields) => {
                if (error)
                    return callBack(error)
                return callBack(null, results)
            }
        )

    },
    getInfoDriverEvents: (data, callBack) => {
        pool.query(
            `SELECT SUBSTR(date, 1, 7) as "month", count(*) as "count" ,event_type FROM driver_events where SUBSTR(date, 1, 7) > ? and event_type = ? GROUP BY SUBSTR(date, 1, 7) ORDER BY month`, [
            data.date,
            data.event_type
        ],
            (error, results, fields) => {
                if (error)
                    return callBack(error)
                return callBack(null, results)
            }
        )
    },
    deleteExpiredNotifications: (callBack) => {
        pool.query(
            `DELETE FROM notifications WHERE expiry_date<LOCALTIME()`, [],
            (error, results, fields) => {
                if (error)
                    return callBack(error)
                return callBack(null, results)
            }
        )
    }

}
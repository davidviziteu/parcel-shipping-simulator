const pool = require("../config/database")

module.exports = {
    getAwbEvents: (awb, callBack) => {
        pool.query(
            `select * from awb_events where awb = ?`, [awb],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
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
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getTokens: (id, callBack) => {
        pool.query(
            `select * from tokens where id = ?`, [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
}
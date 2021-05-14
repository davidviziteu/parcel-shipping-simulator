const http = require(`http`)
const jwt_decode = require('jwt-decode');
const db = require("./config/database")
const routers = require(`./routes`)
const { App } = require(`./utils/app.js`)
require("dotenv").config();


app = new App(process.env.PORT || 4000, db)
app.use(routers.adminRouter)
app.use(routers.clientRouter)
app.use(routers.driverRouter)
app.use(routers.employeeRouter)
app.use(routers.commonRouter)
    // app.useAuth((req) => {
    //     const body = req.body;
    //     const token = body.token;
    //     const decodedToken = jwt_decode(token);
    //     req.db.checkToken(decodedToken.id, (err, data) => {
    //         if (err) {
    //             return res.status(StatusCodes.BAD_REQUEST).json({
    //                 success: false,
    //                 error: error.message
    //             })
    //         } else {

//         }
//     })
// })
console.log(app)
app.listen()
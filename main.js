const http = require(`http`)
const pool = require("./config/database")
const { router } = require(`./routes/common.js`)
const { App } = require(`./utils/app.js`)
require("dotenv").config();

// router.get(`/api/AWB`, (req, res) => {
//     return res.status(301).json({
//         "merge": "merge"
//     })
// })


app = new App((process.env.PORT || 80), router)
app.use(router)
app.listen()



// router.get(`/`, function (req, res) {
//     if (req.data) {
//         responsObj = { "error": req.data.error }
//         // return res.end(JSON.stringify(responsObj))
//         return res.status(301).json({ data: req.data })
//     }
//     return res.end(`merge`)-
// })
const { Router } = require(`../utils/router.js`)
console.log("aici")
let router = new Router();
router.get(`/AWB`, (req, res) => {
    if (req.data) {
        console.log(req.data);
    }
    return res;
});
module.exports = {router}
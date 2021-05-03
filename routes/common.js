const { Router } = require(`../utils/router.js`)
console.log("aici")
let dbAWB = [1,2,3];
let router = new Router();
router.get(`/api/AWB`, (req, res) => {
    console.log(req.data)
    if (req.data.AWB) {
       if(dbAWB.find(function(arg){
           return arg == req.data.AWB;
       }))
            return res.status(200).json({
                "succes":true
            })
        else return res.status(200).json({
            "succes":false
        })
    }
    return res.status(300)
});
module.exports = {router}
const { Router } = require(`../utils/router.js`)
const controllers = require("../controller");
let dbAWB = [1, 2, 3];


let commonRouter = new Router();
commonRouter.get(`/api/getAWB`, controllers.commonController.getAWB);


module.exports = commonRouter
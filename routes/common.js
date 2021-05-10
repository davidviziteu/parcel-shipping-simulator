const { Router } = require(`../utils/router.js`)
const controllers = require("../controller");

let commonRouter = new Router();
commonRouter.get(`/api/get-awb`, controllers.commonController.getAWB);
commonRouter.get(`/api/login`, controllers.commonController.handleLogin)

module.exports = commonRouter
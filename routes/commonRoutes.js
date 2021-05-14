const { Router } = require(`../utils/router.js`)
const controllers = require("../controller");

let commonRouter = new Router();
commonRouter.get(`/api/get-awb`, controllers.commonController.getAWB);
commonRouter.post(`/api/login`, controllers.commonController.handleLogin);
commonRouter.get(`/api/notifications`, controllers.commonController.getNotifications);
commonRouter.get(`/api`, controllers.commonController.getRoutes);
commonRouter.get(`/api/new-order`, controllers.clientController.getCost);
commonRouter.post(`/api/new-order`, controllers.clientController.placeOrder);
module.exports = commonRouter
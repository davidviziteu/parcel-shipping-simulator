const { Router } = require(`../utils/router.js`)
const controllers = require("../controller");
const { apiModel } = require(`../models`)

let commonRouter = new Router();
commonRouter.get(apiModel.baseApi.checkIfAwbExists, controllers.commonController.checkIfAwbExists)
commonRouter.get(`/api/get-awb`, controllers.commonController.getAWB);
commonRouter.post(`/api/login`, controllers.commonController.handleLogin);
commonRouter.get(`/api/notifications`, controllers.commonController.getNotifications);
commonRouter.get(`/api`, controllers.commonController.getApi);
commonRouter.get(`/api/new-order`, controllers.clientController.getCost);
commonRouter.post(`/api/new-order`, controllers.clientController.placeOrder);
commonRouter.post(`/api/logout`, controllers.commonController.handleLogout);
module.exports = commonRouter
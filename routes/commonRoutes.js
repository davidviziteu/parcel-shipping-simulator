const { Router } = require(`../utils/router.js`)
const controllers = require("../controller");
const { apiModel } = require(`../models`)

let commonRouter = new Router();
commonRouter.get(apiModel.baseApi.trackAwb.route, controllers.commonController.trackAwb)
commonRouter.post(`/api/login`, controllers.commonController.handleLogin);
commonRouter.get(`/api/notifications`, controllers.commonController.getNotifications);
commonRouter.get(`/api`, controllers.commonController.getApi);
commonRouter.get(apiModel.driverApi.getDriverCar.route, controllers.commonController.getDriverCar)
// commonRouter.get(`/api/new-order`, controllers.clientController.getCost);
commonRouter.post(`/api/new-order`, controllers.clientController.placeOrder);
commonRouter.post(`/api/logout`, controllers.commonController.handleLogout);
commonRouter.get(apiModel.baseApi.estimateCost.route, controllers.commonController.estimateCost);
commonRouter.get(apiModel.baseApi.helloWord.route, controllers.commonController.helloWord);
commonRouter.post(apiModel.baseApi.newAccount.route, controllers.commonController.createAccountUser);

commonRouter.get(apiModel.baseApi.RSSFeed.route, controllers.commonController.RSSFeed)

module.exports = commonRouter
const controllers = require("../controller");
const { Router } = require("../utils/router");
const api = require("../models/apiModel")

const clientRouter = new Router();
clientRouter.post(`/api/register`, controllers.clientController.createAccountUser);
clientRouter.get(`/api/neworder`, controllers.clientController.getCost);
clientRouter.post(api.baseApi.newOrder.route, controllers.clientController.placeOrder);
clientRouter.post(api.baseApi.getCode.route, controllers.clientController.codeChange);
clientRouter.patch(api.baseApi.changeCredentials.route, controllers.clientController.change)
module.exports = clientRouter
const controllers = require("../controller");
const { Router } = require("../utils/router");

const clientRouter = new Router();
clientRouter.post(`/api/register`, controllers.clientController.createAccountUser);
clientRouter.get(`/api/neworder`, controllers.clientController.getCost);
clientRouter.post(`/api/neworder`, controllers.clientController.placeOrder);
clientRouter.put(`/api/accounts`, controllers.clientController.codeChange);
clientRouter.post(`/api/accounts`, controllers.clientController.change)
module.exports = clientRouter

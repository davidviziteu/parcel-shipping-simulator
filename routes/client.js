const controllers = require("../controller");
const { required } = require("joi");
const { Router } = require("../utils/router");

const clientRouter = new Router();
clientRouter.post(`/api/register`, controllers.clientController.createAccountUser);
clientRouter.get(`/api/neworder`, controllers.clientController.getCost);
clientRouter.post(`/api/neworder`, controllers.clientController.placeOrder);

module.exports = clientRouter 
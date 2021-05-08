const controllers = require("../controller");
const { required } = require("joi");
const { Router } = require("../utils/router");

const clientRouter = new Router();
clientRouter.post(`/api/register`, controllers.clientController.createAccountUser);
clientRouter.get(`/api/neworder`, controllers.clientController.getCost);
module.exports = clientRouter 
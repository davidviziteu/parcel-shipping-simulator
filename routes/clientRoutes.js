const controllers = require("../controller");
const { Router } = require("../utils/router");

const clientRouter = new Router();
clientRouter.post(`/api/register`, controllers.clientController.createAccountUser);


module.exports = clientRouter 

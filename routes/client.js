const { createAccountUser } = require(`../controller/clientController.js`);
const { Router } = require("../utils/router");

const clientRouter = new Router();
clientRouter.post(`/api/register`, createAccountUser)

module.exports = clientRouter 
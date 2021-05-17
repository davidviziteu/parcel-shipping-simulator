const { Router } = require("../utils/router");
const api = require("../models/apiModel")
const controllers = require("../controller");

const adminRouter = new Router();

adminRouter.post(api.baseApi.newAccount.route, controllers.adminController.createAccount)



module.exports = adminRouter
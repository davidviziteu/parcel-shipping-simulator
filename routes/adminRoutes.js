const { Router } = require("../utils/router");
const controllers = require("../controller");
const api = require("../models").apiModel;
const adminController = require("../controller/adminController");

const adminRouter = new Router();
adminRouter.post(api.adminApi.addNotification.route, adminController.addNotification);
adminRouter.delete(api.adminApi.deleteNotification.route, adminController.deleteNotification);
adminRouter.post(api.baseApi.newAccount.route, controllers.adminController.createAccount)
adminRouter.get(api.adminApi.getInfoUser.route, controllers.adminController.getInfoUser)
adminRouter.delete(api.adminApi.deleteAccount.route, controllers.adminController.deleteAccount)

module.exports = adminRouter
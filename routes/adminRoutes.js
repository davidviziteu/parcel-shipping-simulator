const { Router } = require("../utils/router");
const controllers = require("../controller");
const api = require("../models").apiModel;
const adminController = require("../controller/adminController");

const adminRouter = new Router();
adminRouter.post(api.adminApi.addNotification.route, adminController.addNotification);






module.exports = adminRouter
const { Router } = require("../utils/router");
const controllers = require("../controller");
const api = require("../models").apiModel;
const adminController = require("../controller/adminController");

const adminRouter = new Router();
adminRouter.post(api.adminApi.addNotification.route, adminController.addNotification);
adminRouter.delete(api.adminApi.deleteNotification.route, adminController.deleteNotification);
adminRouter.post(api.baseApi.newAccount.route, controllers.adminController.createAccount)
adminRouter.patch(api.adminApi.modifyCar.route, controllers.adminController.modifyCar)
adminRouter.patch(api.adminApi.changeDriver.route, controllers.adminController.changeDriver)
adminRouter.delete(api.adminApi.removeCar.route, controllers.adminController.removeCar)
adminRouter.post(api.adminApi.addCar.route, controllers.adminController.addCar)
adminRouter.post(api.adminApi.changePrice.route, adminController.changePrice);

adminRouter.get(api.adminApi.getInfoUser.route, controllers.adminController.getInfoUser)
adminRouter.delete(api.adminApi.deleteAccount.route, controllers.adminController.deleteAccount)
adminRouter.get(api.adminApi.getTables.route, controllers.adminController.getDbTables);
adminRouter.post(api.adminApi.uploadFile.route, controllers.adminController.uploadFiles);
adminRouter.get(api.adminApi.downloadFile.route, controllers.adminController.downloadFiles);

adminRouter.get(api.adminApi.getInfoStatistics.route, controllers.adminController.getInfoStatistics)
adminRouter.get(api.adminApi.getInfoStatisticsBadEvent.route, controllers.adminController.getInfoStatisticsBadEvent)

module.exports = adminRouter
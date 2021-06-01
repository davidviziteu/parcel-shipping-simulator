const { Router } = require("../utils/router");
const controllers = require("../controller");
const { apiModel } = require("../models");


const driverRouter = new Router();

driverRouter.post(apiModel.driverApi.driverEvent.route, controllers.driverController.addEvents)
driverRouter.get(`/api/driver`, controllers.driverController.detailsOrder)



module.exports = driverRouter
const { Router } = require("../utils/router");
const controllers = require("../controller");


const driverRouter = new Router();

driverRouter.post(`/api/driver`, controllers.driverController.addEvents)
driverRouter.get(`/api/driver`, controllers.driverController.detailsOrder)



module.exports = driverRouter
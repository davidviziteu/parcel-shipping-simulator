const { employeeController } = require("../controller");
const { employeeApi } = require("../models/apiModel");
const { Router } = require("../utils/router");
const employeeRouter = new Router();

employeeRouter.patch(employeeApi.confirmDenyOrder.route, employeeController.confirmDenyOrder)

module.exports = employeeRouter
const { StatusCodes } = require("http-status-codes");
const { privateController } = require("../controller");
const { Router } = require("../utils/router");
const privateRouter = new Router();

// privateRouter.get(`/api/private/driver-data`, privateController.getDriverData)
privateRouter.get(`/api/private/driver-data`, privateController.getDriverData);

module.exports = privateRouter
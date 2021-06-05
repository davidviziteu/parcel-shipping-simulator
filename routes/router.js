const { Router } = require(`../utils/router`)
const controllers = require(`../controller`);
const { StatusCodes } = require("http-status-codes");
const router = new Router();

router.post(`/api/private/driver-task`, controllers.defaultController.getDriverTask) //pt ca idempotenta si mdn
router.patch(`/api/private/driver-task`, controllers.defaultController.updateDriverTask)
router.delete(`/api/private/taskdb`, controllers.defaultController.emptyDB)

module.exports = router
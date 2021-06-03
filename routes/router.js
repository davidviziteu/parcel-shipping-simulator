const { Router } = require(`../utils/router`)
const controllers = require(`../controller`)
const router = new Router();

router.get(`/api/private/driver-task`, controllers.defaultController.getDriverTask)
router.patch(`/api/private/driver-task`, controllers.defaultController.getDriverTask)


module.exports = router
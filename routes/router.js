const { Router } = require(`../utils/router`)
const controllers = require(`../controller`)
const router = new Router();

router.get(`/api/get-driver-task`, controllers.defaultController.getDriverTask)
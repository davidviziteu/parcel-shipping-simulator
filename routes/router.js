const { Router } = require(`../utils/router`)
const controllers = require(`../controller`);
const { StatusCodes } = require("http-status-codes");
const router = new Router();

router.post(`/api/private/driver-task`, controllers.defaultController.getDriverTask) //pt ca idempotenta si mdn
router.patch(`/api/private/driver-task`, controllers.defaultController.getDriverTask)
router.delete(`/api/private/taskdb`, async (req, res) => {
    try {
        await Promise.all([req.db.driverTasks.deleteMany(), req.db.countyTasks.deleteMany()]);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            db: error.message
        });
    }
    return res.status(StatusCodes.OK).json({
        success: true
    });
})

module.exports = router
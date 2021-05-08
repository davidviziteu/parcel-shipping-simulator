const { createAccountUser } = require("../controller/controller");
const { Router } = require("../utils/router");

const router = new Router();

router.post(`/api/register`, createAccountUser)

console.log(createAccountUser)

module.exports = { router }
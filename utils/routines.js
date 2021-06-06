const { default: fetch } = require("node-fetch");
const { distributionMicroservices } = require("../models/apiModel");

var now = new Date();
var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0, 0, 0) - now;
if (millisTill10 < 0) {
    millisTill10 += 86400000; // it's after 10am, try 10am tomorrow.
}
setTimeout(function () { alert("It's 10am!") }, millisTill10);

async function wakeUpMicroservices() {
    distributionMicroservices.forEach(service =>
        fetch(service.address)
            .then(res => console.log(`[wake up miscroservices] ${service.name} status ${res.status}`))
            .catch(err => console.error(`[wake up miscroservices] error from ${service.name}: ${err.message}`))
    )
}

module.exports = { wakeUpMicroservices }
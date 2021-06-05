//https://stackoverflow.com/questions/5364928/node-js-require-all-files-in-a-folder
const driverTaskSchema = require(`./driverTaskSchema`)
const countyTasksDoneToday = require(`./doneTodaySchema`)
const dataInputModel = require(`./dataInputModel`)

module.exports = {
    driverTaskSchema,
    countyTasksDoneToday,
}
const { Schema, model } = require('mongoose')

const driverTaskSchema = new Schema({
    task: {
        type: String,
        required: true,
    },
    countySource: {
        type: String,
        required: true,
    },
    countyDestination: {
        type: String,
        required: true,
    },
    car: {
        type: String,
        required: true,
    },
    toDeliver: {
        type: Array,
        required: true,
    },
    toPickup: {
        type: Array,
        required: true,
    },
    driverCounty: {
        type: String,
        required: true,
    },
    driverId: {
        type: Number,
        required: true,
    },
}, { collection: 'tasks' })



module.exports = model('driverTask', driverTaskSchema)
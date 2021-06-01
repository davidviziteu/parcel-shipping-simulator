const { Schema, model } = require('mongoose')

const countyTasksDoneToday = new Schema({
    county: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
}, { collection: 'done-today' })

module.exports = model('countyTasksDoneToday', countyTasksDoneToday)

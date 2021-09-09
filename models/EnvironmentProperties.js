const mongoose = require('mongoose');

const EnvironmentPropertiesSchema = mongoose.Schema({
    temperature: {
        type: Number,
        required: true
    },
    humidity: {
        type: Number,
        required: true
    },
    gasConcentration: {
        type: Object,
        required: true
    },
    location: {
        type: Object,
        required: true
    },
    particulateMatter: {
        type: Object,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('EnvironmentProperties', EnvironmentPropertiesSchema);
const express = require('express');
const EnvironmentProperties = require('../models/EnvironmentProperties');

const router = express.Router();

router.get('/environment-properties', (req, res) => {
    // Get all environment properties
    const environmentProperties = EnvironmentProperties.find();
    environmentProperties.exec()
    .then(result => {
        res.status(200).json({
            data: result,
            message: 'READ'
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'Failed to read environment properties from DB'
        });
    });
});

router.get('/environment-properties/:temperature/:humidity/:mq3/:mq5/:mq5e/:mq6/:mq7/:mq9/:pm25/:pm10/:latitude/:longitude', (req, res) => {
    let temperature = req.params.temperature;
    let humidity = req.params.humidity;
    let gasConcentration = {
        mq3: req.params.mq3,
        mq5: req.params.mq5,
        mq5e: req.params.mq5e,
        mq6: req.params.mq6,
        mq7: req.params.mq7,
        mq9: req.params.mq9
    };
    let location = {
        latitude: req.params.latitude,
        longitude: req.params.longitude
    };
    let particulateMatter = {
        pm25: req.params.pm25,
        pm10: req.params.pm10
    };

    const dateTime = new Date();
    dateTime.setHours(dateTime.getHours() + 1);
    let date = dateTime.toLocaleDateString();
    let time = dateTime.toLocaleTimeString();

    const environmentProperties = new EnvironmentProperties({
        temperature,
        humidity,
        gasConcentration,
        location,
        particulateMatter,
        date,
        time
    });

    environmentProperties.save()
    .then(result => {
        res.status(200).json({
            data: result,
            message: 'CREATED'
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'Failed to add environment properties to DB'
        });
    });
});

router.delete('/environment-properties', (req, res) => {
    const environmentProperties = EnvironmentProperties.deleteMany({});
    environmentProperties.exec()
    .then(result => {
        res.status(200).json({
            data: result,
            message: 'DELETED'
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'Could not delete environment properties from DB'
        });
    });
});

module.exports = router;
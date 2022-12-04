const express = require('express');
const EnvironmentProperties02 = require('../models/EnvironmentProperties02');

const router = express.Router();

router.get('/environment-properties', (req, res) => {
    // Get all environment properties
    const environmentProperties02 = EnvironmentProperties02.find();
    environmentProperties02.exec()
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

router.get('/environment-properties/:temperature/:humidity/:mq2/:mq4/:mq8/:mq9/:mq135/:mq136/:pm25/:pm10/:latitude/:longitude', (req, res) => {
    let temperature = req.params.temperature;
    let humidity = req.params.humidity;
    let gasConcentration = {
        mq2: req.params.mq2,
        mq4: req.params.mq4,
        mq8: req.params.mq8,
        mq9: req.params.mq9,
        mq135: req.params.mq135,
        mq136: req.params.mq136
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

    const environmentProperties02 = new EnvironmentProperties02({
        temperature,
        humidity,
        gasConcentration,
        location,
        particulateMatter,
        date,
        time
    });

    environmentProperties02.save()
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
    const environmentProperties02 = EnvironmentProperties02.deleteMany({});
    environmentProperties02.exec()
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
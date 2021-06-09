const express = require('express');

const router = express.Router();

let storage = [];

router.get('/environment-properties', (req, res) => {
    res.json({
        data: storage,
        message: "READ"
    });
});

router.get('/environment-properties/:temperature/:humidity/:gasConcentration/:pm25/:pm10/:latitude/:longitude', (req, res) => {
    let id = storage.length + 1;
    let temperature = req.params.temperature;
    let humidity = req.params.humidity;
    let gasConcentration = req.params.gasConcentration;
    let location = {
        latitude: req.params.latitude,
        longitude: req.params.longitude
    };
    let particulateMatter = {
        pm25: req.params.pm25,
        pm10: req.params.pm10
    };

    const dateTime = new Date();

    let day = dateTime.getDate() < 10 ? '0' + dateTime.getDate() : dateTime.getDate();
    let month = (dateTime.getMonth() + 1) < 10 ? '0' + (dateTime.getMonth() + 1) : (dateTime.getMonth() + 1);
    let year = dateTime.getFullYear();

    let date = `${year}-${month}-${day}`;
    let time = dateTime.toLocaleTimeString();

    const environmentProperties = {
        id,
        temperature,
        humidity,
        gasConcentration,
        location,
        particulateMatter,
        date,
        time
    };

    storage.push(environmentProperties);

    res.json({
        data: environmentProperties,
        message: "CREATED"
    });

});

router.delete('/environment-properties', (req, res) => {

    storage = [];

    res.json({
        data: storage,
        message: "DELETED"
    });
});


module.exports = router;
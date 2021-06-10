const express = require('express');

const router = express.Router();

let storage = [];

/**
 * @swagger
 * /api/v1/environment-properties:
 *      get:
 *          description: Get all environment properties
 *          responses:
 *              200:
 *                  description: All environment properties
 * 
 */
router.get('/environment-properties', (req, res) => {
    res.json({
        data: storage,
        message: "READ"
    });
});

/**
 * @swagger
 * /api/v1/environment-properties/{temperature}/{humidity}/{gasConcentration}/{pm25}/{pm10}/{latitude}/{longitude}:
 *      get:
 *          description: Add new environment data
 *          parameters:
 *              -   in: path
 *                  name: temperature
 *                  required: true
 *                  description: Temperature of the environment
 *                  schema:
 *                      type: integer
 *              -   in: path
 *                  name: humidity
 *                  required: true
 *                  description: Humidity of environment
 *                  schema:
 *                      type: integer
 *              -   in: path
 *                  name: gasConcentration
 *                  required: true
 *                  description: Gas concentration of detected gas in environment
 *                  schema:
 *                      type: integer
 *              -   in: path
 *                  name: pm25
 *                  required: true
 *                  description: Particulate matter (PM2.5) of environment
 *                  schema:
 *                      type: integer
 *              -   in: path
 *                  name: pm10
 *                  required: true
 *                  description: Particulate matter (PM10) of environment
 *                  schema:
 *                      type: integer
 *              -   in: path
 *                  name: latitude
 *                  required: true
 *                  description: Current latitude
 *                  schema:
 *                      type: integer
 *              -   in: path
 *                  name: longitude
 *                  required: true
 *                  description: Current longitude
 *                  schema:
 *                      type: integer
 *          responses:
 *              200:
 *                  description: Success
 * 
 */
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

/**
 * @swagger
 * /api/v1/environment-properties:
 *      delete:
 *          description: Delete all environment properties
 *          responses:
 *              200:
 *                  description: Deleted
 * 
 */
router.delete('/environment-properties', (req, res) => {

    storage = [];

    res.json({
        data: storage,
        message: "DELETED"
    });
});


module.exports = router;
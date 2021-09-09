const express = require('express');
const EnvironmentProperties = require('../models/EnvironmentProperties');

const router = express.Router();

/**
 * @swagger
 * /api/v1/environment-properties:
 *      get:
 *          description: Get all environment properties
 *          responses:
 *              200:
 *                  description: All environment properties
 *              500:
 *                  description: Failed to read environment properties from DB
 * 
 */
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

/**
 * @swagger
 * /api/v1/environment-properties/{temperature}/{humidity}/{mq3}/{mq5}/{mq9}/{pm25}/{pm10}/{latitude}/{longitude}:
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
 *                  name: mq3
 *                  required: true
 *                  description: Gas concentration (MQ3) of detected gas in environment
 *                  schema:
 *                      type: integer
 *              -   in: path
 *                  name: mq5
 *                  required: true
 *                  description: Gas concentration (MQ5) of detected gas in environment
 *                  schema:
 *                      type: integer
 *              -   in: path
 *                  name: mq9
 *                  required: true
 *                  description: Gas concentration (MQ9) of detected gas in environment
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
 *              500:
 *                  description: Failed to add environment properties to DB
 * 
 */
router.get('/environment-properties/:temperature/:humidity/:mq3/:mq5/:mq9/:pm25/:pm10/:latitude/:longitude', (req, res) => {
    let temperature = req.params.temperature;
    let humidity = req.params.humidity;
    let gasConcentration = {
        mq3: req.params.mq3,
        mq5: req.params.mq5,
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

/**
 * @swagger
 * /api/v1/environment-properties:
 *      delete:
 *          description: Delete all environment properties
 *          responses:
 *              200:
 *                  description: Deleted
 *              500:
 *                  description: Could not delete environment properties from DB
 * 
 */
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
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require("./routes/routes");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUIExpress = require('swagger-ui-express');
require('dotenv').config();

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Internet-of-Things (IoT) API',
            version: '1.0.0',
            description: 'API for IoT-based air quality monitoring system'
        }
    },
    apis: ['routes/routes.js']
}
const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());

//Routes section
app.use("/api/v1", routes);
app.use('/', swaggerUIExpress.serve, swaggerUIExpress.setup(swaggerDocs));

//Connect to remote database
mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true}, error => {
    if(!error){
        console.log('Connected to remote database');
    } else {
        console.log('ERROR: ' + error);
    }
});

//Start the server application
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Environment monitoring server started on port ${PORT}`);
});

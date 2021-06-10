const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require("./routes/routes");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUIExpress = require('swagger-ui-express');

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
app.use('/', swaggerUIExpress.serve, swaggerUIExpress.setup(swaggerDocs));

//Routes section
app.use("/api/v1", routes);

//Start the server application
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Environment properties server started at port 5000");
});

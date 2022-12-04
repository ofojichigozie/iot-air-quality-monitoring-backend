const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');
require('dotenv').config();
const routes = require("./routes/routes");
const routes02 = require("./routes/routes02");

const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());

//Routes section
app.use("/.netlify/functions/api/v1", routes);
app.use("/.netlify/functions/api/v2", routes02);

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

//Connect to remote database
mongoose.connect(process.env.DB_CONNECTION_STRING, options, error => {
    if(!error){
        console.log('Connected to remote database');
    } else {
        console.log('ERROR: ' + error);
    }
});

const handler = serverless(app);
module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};
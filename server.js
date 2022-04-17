const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require("./routes/routes");
const routes02 = require("./routes/routes02");
require('dotenv').config();

const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());

//Routes section
app.use("/api/v1", routes);
app.use("/api/v2", routes02);

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

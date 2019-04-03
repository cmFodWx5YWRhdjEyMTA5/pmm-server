const express = require("express");
const PORT = 3000;
require ('custom-env').env('pmm');
var partyResource = require("./resource/partyResource");
var travelResource = require("./resource/travelResource");  
// Create the application.
const app = express();

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/home", (req,res) => {
    console.log("response " + req.url);
    res.send("Hello World !!!")
});

// Routing to other responsable to handle request
app.use("", partyResource);
app.use("", travelResource);


app.listen(process.env.PORT || PORT, ()=> {
    console.log("Listen at port : " + process.env.PORT);
    swaggerDocument.host=process.env.HOST;
})

process.on('uncaughtException', (err) => {
    console.log("========Uncaught exception========");
    console.log(err);
});

module.exports = app;

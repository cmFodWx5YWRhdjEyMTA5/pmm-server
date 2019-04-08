const express = require("express");
const PORT = 3000;
require ('custom-env').env('pmm');
var partyResource = require("./resource/partyResource"),
    travelResource = require("./resource/travelResource"),
    scoreResource = require("./resource/scoreResource");
    connectionModel = require("./model/connection");
var http = require("http");
const app = express();

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/home", (req,res) => {
    console.log("response " + req.url);
    res.send("hello !!!");
});

// Routing to other responsable to handle request
app.use("", partyResource);
app.use("", travelResource);
app.use("", scoreResource);
app.use(express.static("public"));

var server = app.listen(process.env.PORT || PORT, ()=> {
    console.log("Listen at port : " + process.env.PORT);
})
//exports.server = server;
io = require('socket.io').listen(server);

var connectionsUsers = new Map();
var connectionsDrivers = new Map();
var connectionDelete = new Map();

var socketDriver;
exports.socketDriver = socketDriver;

 exports.users = connectionsUsers;
 exports.drivers = connectionsDrivers;

io.on('connection', (socket) => {
    console.log("one  connected :" + socket.id);
    socket.on('ROL', function(rol) {
        var connection = new connectionModel.ConnectionInfo(socket.id, rol, socket);
        if (rol == "USER") {
            connectionsUsers.set(socket.id,connection);
        } else {
            connectionsDrivers.set(socket.id,connection);
            socketDriver = socket;
        }
        console.log(connectionsUsers);
        console.log(connectionsDrivers);
    });

    socket.on('disconnect', () => {
        console.log( 'user has left : ' + socket.id);
            connectionsUsers.delete(socket.id);
            connectionsDrivers.delete(socket.id);
    });
    socket.emit("message", {
        id:1,
        text: "i'm a message",
        author: "app-server"
    });

});


process.on('uncaughtException', (err) => {
    console.log("========Uncaught exception========");
    console.log(err);
});

module.exports = app;
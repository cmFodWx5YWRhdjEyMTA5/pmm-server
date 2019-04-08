var travel = require("../model/travel"),
    express = require("express"),
    app = express(),
    parser = require("body-parser"),
    travelService = require("../service/travelServiceMock");
    socket = require("../main");

app.use(parser.json());

app.post("/travels", function(req, res) {
    var argmap = new Map();
    argmap.set('json', req.body);
    var geographicCoordenate = new travel.GeographicCoordenate(argmap);

    socket.socket.emit("POSITION DRIVER", "respuesta de position driver");

    res.status(200).json(travelService.findDriver(geographicCoordenate));
})

module.exports = app;
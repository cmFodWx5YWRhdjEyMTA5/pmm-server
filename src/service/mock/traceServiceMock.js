require('console-info');
var scoreModel = require("../../model/trace");
parser = require("body-parser"),

exports.saveTrace = function saveTrace(trace) {
    console.info("traceServiceMock: saveTrace");
    return "{\"message\" : \"ok\"}";
}
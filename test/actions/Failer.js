"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var TickStub_1 = require("../TickStub");
var Failer_1 = require("../../src/actions/Failer");
var constants_1 = require("../../src/constants");
suite('Action: Failer', function () {
    test('Prototype', function () {
        chai_1.assert.equal(Failer_1["default"].prototype.name, 'Failer');
    });
    test('Tick', function () {
        var failer = new Failer_1["default"]();
        var status = failer._execute(TickStub_1["default"]());
        chai_1.assert.equal(status, constants_1.FAILURE);
    });
});

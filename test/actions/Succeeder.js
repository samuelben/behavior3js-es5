"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var TickStub_1 = require("../TickStub");
var Succeeder_1 = require("../../src/actions/Succeeder");
var constants_1 = require("../../src/constants");
suite('Action: Succeeder', function () {
    test('Prototype', function () {
        chai_1.assert.equal(Succeeder_1["default"].prototype.name, 'Succeeder');
    });
    test('Tick', function () {
        var failer = new Succeeder_1["default"]();
        var status = failer._execute(TickStub_1["default"]());
        chai_1.assert.equal(status, constants_1.SUCCESS);
    });
});

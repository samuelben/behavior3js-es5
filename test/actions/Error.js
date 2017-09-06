"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var TickStub_1 = require("../TickStub");
var Error_1 = require("../../src/actions/Error");
var constants_1 = require("../../src/constants");
suite('Action: Error', function () {
    test('Prototype', function () {
        chai_1.assert.equal(Error_1["default"].prototype.name, 'Error');
    });
    test('Tick', function () {
        var failer = new Error_1["default"]();
        var status = failer._execute(TickStub_1["default"]());
        chai_1.assert.equal(status, constants_1.ERROR);
    });
});

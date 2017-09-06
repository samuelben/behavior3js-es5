"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var TickStub_1 = require("../TickStub");
var Runner_1 = require("../../src/actions/Runner");
var constants_1 = require("../../src/constants");
suite('Action: Runner', function () {
    test('Prototype', function () {
        chai_1.assert.equal(Runner_1["default"].prototype.name, 'Runner');
    });
    test('Tick', function () {
        var failer = new Runner_1["default"]();
        var status = failer._execute(TickStub_1["default"]());
        chai_1.assert.equal(status, constants_1.RUNNING);
    });
});

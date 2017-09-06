"use strict";
exports.__esModule = true;
var sinon_1 = require("sinon");
var chai_1 = require("chai");
var TickStub_1 = require("../TickStub");
var Inverter_1 = require("../../src/decorators/Inverter");
var constants_1 = require("../../src/constants");
suite('Decorator: Inverter', function () {
    test('Prototype', function () {
        chai_1.assert.equal(Inverter_1["default"].prototype.name, 'Inverter');
    });
    test('Initialization', function () {
        var node = new Inverter_1["default"]();
        chai_1.assert.equal(node.name, 'Inverter');
    });
    test('Inverting Values', function () {
        var tick = TickStub_1["default"]();
        var child = { '_execute': sinon_1.stub() };
        var node = new Inverter_1["default"]({ child: child });
        var status = 0;
        child._execute.returns(constants_1.SUCCESS);
        status = node._execute(tick);
        chai_1.assert.equal(status, constants_1.FAILURE);
        child._execute.returns(constants_1.FAILURE);
        status = node._execute(tick);
        chai_1.assert.equal(status, constants_1.SUCCESS);
    });
    test('Running and Error', function () {
        var tick = TickStub_1["default"]();
        var child = { '_execute': sinon_1.stub() };
        var node = new Inverter_1["default"]({ child: child });
        var status = 0;
        child._execute.returns(constants_1.RUNNING);
        status = node._execute(tick);
        chai_1.assert.equal(status, constants_1.RUNNING);
        child._execute.returns(constants_1.ERROR);
        status = node._execute(tick);
        chai_1.assert.equal(status, constants_1.ERROR);
    });
});

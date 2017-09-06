"use strict";
exports.__esModule = true;
var sinon_1 = require("sinon");
var chai_1 = require("chai");
var TickStub_1 = require("../TickStub");
var RepeatUntilFailure_1 = require("../../src/decorators/RepeatUntilFailure");
var constants_1 = require("../../src/constants");
suite('Decorator: RepeatUntilFailure', function () {
    test('Prototype', function () {
        chai_1.assert.equal(RepeatUntilFailure_1["default"].prototype.name, 'RepeatUntilFailure');
    });
    test('Initialization', function () {
        var node = new RepeatUntilFailure_1["default"]();
        chai_1.assert.equal(node.maxLoop, -1);
        chai_1.assert.equal(node.name, 'RepeatUntilFailure');
        var node = new RepeatUntilFailure_1["default"]({ maxLoop: 5 });
        chai_1.assert.equal(node.maxLoop, 5);
    });
    test('Test Maximum Repetition', function () {
        var tick = TickStub_1["default"]();
        tick.blackboard.get.returns(0);
        var child = { '_execute': sinon_1.stub() };
        child._execute.returns(constants_1.SUCCESS);
        var node = new RepeatUntilFailure_1["default"]({ maxLoop: 7, child: child });
        var status = node._execute(tick);
        chai_1.assert.equal(child._execute.callCount, 7);
        chai_1.assert.equal(status, constants_1.SUCCESS);
    });
    test('Test Repeat interruption (by FAILURE)', function () {
        var tick = TickStub_1["default"]();
        tick.blackboard.get.returns(0);
        var child = { '_execute': sinon_1.stub() };
        child._execute.returns(constants_1.SUCCESS);
        child._execute.onCall(3).returns(constants_1.FAILURE);
        var node = new RepeatUntilFailure_1["default"]({ maxLoop: 50, child: child });
        var status = node._execute(tick);
        chai_1.assert.equal(child._execute.callCount, 4);
        chai_1.assert.equal(status, constants_1.FAILURE);
    });
    test('Test Repeat interruption (by RUNNING)', function () {
        var tick = TickStub_1["default"]();
        tick.blackboard.get.returns(0);
        var child = { '_execute': sinon_1.stub() };
        child._execute.returns(constants_1.SUCCESS);
        child._execute.onCall(5).returns(constants_1.RUNNING);
        var node = new RepeatUntilFailure_1["default"]({ maxLoop: 50, child: child });
        var status = node._execute(tick);
        chai_1.assert.equal(child._execute.callCount, 6);
        chai_1.assert.equal(status, constants_1.RUNNING);
    });
    test('Test Repeat interruption (by ERROR)', function () {
        var tick = TickStub_1["default"]();
        tick.blackboard.get.returns(0);
        var child = { '_execute': sinon_1.stub() };
        child._execute.returns(constants_1.SUCCESS);
        child._execute.onCall(3).returns(constants_1.ERROR);
        var node = new RepeatUntilFailure_1["default"]({ maxLoop: 50, child: child });
        var status = node._execute(tick);
        chai_1.assert.equal(child._execute.callCount, 4);
        chai_1.assert.equal(status, constants_1.ERROR);
    });
});

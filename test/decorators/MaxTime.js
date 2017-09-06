"use strict";
exports.__esModule = true;
var sinon_1 = require("sinon");
var chai_1 = require("chai");
var TickStub_1 = require("../TickStub");
var utils_1 = require("../utils");
var MaxTime_1 = require("../../src/decorators/MaxTime");
var constants_1 = require("../../src/constants");
suite('Decorator: MaxTime', function () {
    test('Prototype', function () {
        chai_1.assert.equal(MaxTime_1["default"].prototype.name, 'MaxTime');
    });
    test('Failure test', function () {
        var tick = TickStub_1["default"]();
        var startTime = (new Date()).getTime();
        tick.blackboard.get
            .onCall(0).returns(false)
            .onCall(1).returns(startTime)
            .onCall(2).returns(true)
            .onCall(3).returns(startTime);
        var child = { '_execute': sinon_1.stub() };
        child._execute.returns(constants_1.RUNNING);
        var node = new MaxTime_1["default"]({ maxTime: 15, child: child });
        var status = node._execute(tick);
        chai_1.assert.equal(status, constants_1.RUNNING);
        while ((new Date()).getTime() - startTime < 25) {
            utils_1.sleep(1);
        }
        var status = node._execute(tick);
        chai_1.assert.equal(status, constants_1.FAILURE);
    });
    test('Success test', function () {
        var tick = TickStub_1["default"]();
        var startTime = (new Date()).getTime();
        tick.blackboard.get
            .onCall(0).returns(false)
            .onCall(1).returns(startTime)
            .onCall(2).returns(true)
            .onCall(3).returns(startTime);
        var child = { '_execute': sinon_1.stub() };
        child._execute.returns(constants_1.RUNNING);
        var node = new MaxTime_1["default"]({ maxTime: 15, child: child });
        var status = node._execute(tick);
        chai_1.assert.equal(status, constants_1.RUNNING);
        while ((new Date()).getTime() - startTime < 5) {
            utils_1.sleep(1);
        }
        child._execute.returns(constants_1.SUCCESS);
        var status = node._execute(tick);
        chai_1.assert.equal(status, constants_1.SUCCESS);
    });
});

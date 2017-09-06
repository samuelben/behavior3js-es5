"use strict";
exports.__esModule = true;
var sinon_1 = require("sinon");
var chai_1 = require("chai");
var TickStub_1 = require("../TickStub");
var Limiter_1 = require("../../src/decorators/Limiter");
var constants_1 = require("../../src/constants");
suite('Decorator: Limiter', function () {
    test('Prototype', function () {
        chai_1.assert.equal(Limiter_1["default"].prototype.name, 'Limiter');
    });
    test('Initialization', function () {
        var node = new Limiter_1["default"]({ maxLoop: 3 });
        chai_1.assert.equal(node.name, 'Limiter');
    });
    test('Open', function () {
        var child = { '_execute': sinon_1.stub() };
        var tick = TickStub_1["default"]();
        var node = new Limiter_1["default"]({ maxLoop: 3, child: child });
        node.id = 'node1';
        node._execute(tick);
        chai_1.assert.isTrue(tick.blackboard.set.calledWith('i', 0, 'tree1', 'node1'));
    });
    test('Test Maximum Repetition', function () {
        var child = { '_execute': sinon_1.stub() };
        var tick = TickStub_1["default"]();
        var node = new Limiter_1["default"]({ maxLoop: 10, child: child });
        child._execute.returns(constants_1.SUCCESS);
        node.id = 'node1';
        tick.blackboard.get
            .onCall(0).returns(false)
            .onCall(1).returns(0)
            .onCall(2).returns(true)
            .onCall(3).returns(10);
        node._execute(tick);
        chai_1.assert.equal(child._execute.callCount, 1);
        node._execute(tick);
        chai_1.assert.equal(child._execute.callCount, 1);
    });
    test('RUNNING doesnt count', function () {
        var child = { '_execute': sinon_1.stub() };
        var tick = TickStub_1["default"]();
        var node = new Limiter_1["default"]({ maxLoop: 10, child: child });
        child._execute.returns(constants_1.RUNNING);
        node.id = 'node1';
        node._execute(tick);
        chai_1.assert.isTrue(tick.blackboard.set.calledWith('i', 0, 'tree1', 'node1'));
        chai_1.assert.isFalse(tick.blackboard.set.calledWith('i', 1, 'tree1', 'node1'));
    });
});

"use strict";
exports.__esModule = true;
var sinon_1 = require("sinon");
var chai_1 = require("chai");
var TickStub_1 = require("../TickStub");
var MemPriority_1 = require("../../src/composites/MemPriority");
var constants_1 = require("../../src/constants");
suite('Composite: MemPriority', function () {
    var getNode = function () {
        var _execute = sinon_1.stub();
        for (var i = 0; i < arguments.length; i++) {
            _execute.onCall(i).returns(arguments[i]);
        }
        return { '_execute': _execute };
    };
    test('Prototype', function () {
        chai_1.assert.equal(MemPriority_1["default"].prototype.name, 'MemPriority');
    });
    test('Open', function () {
        var mpriority = new MemPriority_1["default"]();
        var tick = TickStub_1["default"]();
        mpriority.id = 'node1';
        mpriority.open(tick);
        var method = tick.blackboard.set.withArgs('runningChild', 0, 'tree1', 'node1');
        chai_1.assert.isTrue(method.calledOnce);
    });
    test('Success', function () {
        var node1 = getNode(constants_1.FAILURE);
        var node2 = getNode(constants_1.SUCCESS);
        var node3 = getNode(constants_1.SUCCESS);
        var mpriority = new MemPriority_1["default"]({ children: [node1, node2, node3] });
        var tick = TickStub_1["default"]();
        tick.blackboard.get.returns(0);
        var status = mpriority.tick(tick);
        chai_1.assert.equal(status, constants_1.SUCCESS);
        chai_1.assert.isTrue(node1._execute.calledOnce);
        chai_1.assert.isTrue(node2._execute.calledOnce);
        chai_1.assert.isFalse(node3._execute.called);
    });
    test('Failure', function () {
        var node1 = getNode(constants_1.FAILURE);
        var node2 = getNode(constants_1.FAILURE);
        var node3 = getNode(constants_1.FAILURE);
        var mpriority = new MemPriority_1["default"]({ children: [node1, node2, node3] });
        var tick = TickStub_1["default"]();
        tick.blackboard.get.returns(0);
        var status = mpriority.tick(tick);
        chai_1.assert.equal(status, constants_1.FAILURE);
        chai_1.assert.isTrue(node1._execute.calledOnce);
        chai_1.assert.isTrue(node2._execute.calledOnce);
        chai_1.assert.isTrue(node3._execute.calledOnce);
    });
    test('Running', function () {
        var node1 = getNode(constants_1.FAILURE);
        var node2 = getNode(constants_1.FAILURE);
        var node3 = getNode(constants_1.RUNNING);
        var node4 = getNode(constants_1.SUCCESS);
        var mpriority = new MemPriority_1["default"]({ children: [node1, node2, node3, node4] });
        var tick = TickStub_1["default"]();
        tick.blackboard.get.returns(0);
        var status = mpriority.tick(tick);
        chai_1.assert.equal(status, constants_1.RUNNING);
        chai_1.assert.isTrue(node1._execute.calledOnce);
        chai_1.assert.isTrue(node2._execute.calledOnce);
        chai_1.assert.isTrue(node3._execute.calledOnce);
        chai_1.assert.isFalse(node4._execute.called);
    });
    test('Memory Tick', function () {
        var node1 = getNode(constants_1.FAILURE);
        var node2 = getNode(constants_1.FAILURE);
        var node3 = getNode(constants_1.RUNNING, constants_1.FAILURE);
        var node4 = getNode(constants_1.SUCCESS);
        var node5 = getNode(constants_1.FAILURE);
        var mpriority = new MemPriority_1["default"]({ children: [node1, node2, node3, node4, node5] });
        var tick = TickStub_1["default"]();
        mpriority.id = 'node1';
        // Execute two times, the first returning running, the second failure
        tick.blackboard.get.withArgs('runningChild', 'tree1', 'node1')
            .returns(0);
        var status = mpriority._execute(tick);
        chai_1.assert.equal(status, constants_1.RUNNING);
        chai_1.assert.isTrue(tick.blackboard.set
            .withArgs('runningChild', 0, 'tree1', 'node1')
            .calledOnce);
        chai_1.assert.isTrue(tick.blackboard.set
            .withArgs('runningChild', 2, 'tree1', 'node1')
            .calledOnce);
        // second execute
        tick.blackboard.get.withArgs('runningChild', 'tree1', 'node1')
            .returns(2);
        status = mpriority._execute(tick);
        chai_1.assert.equal(status, constants_1.SUCCESS);
        // Verifies the node activations
        chai_1.assert.isTrue(node1._execute.calledOnce);
        chai_1.assert.isTrue(node2._execute.calledOnce);
        chai_1.assert.isTrue(node3._execute.calledTwice);
        chai_1.assert.isTrue(node4._execute.calledOnce);
        chai_1.assert.isFalse(node5._execute.called);
    });
});

"use strict";
exports.__esModule = true;
var sinon_1 = require("sinon");
var chai_1 = require("chai");
var TickStub_1 = require("../TickStub");
var BaseNode_1 = require("../../src/core/BaseNode");
var constants_1 = require("../../src/constants");
suite('Core: BaseNode', function () {
    test('Initialization', function () {
        var node = new BaseNode_1["default"]();
        chai_1.assert.isOk(node.id);
        chai_1.assert.isDefined(node.name);
        chai_1.assert.isDefined(node.category);
        chai_1.assert.isDefined(node.title);
        chai_1.assert.isDefined(node.description);
        chai_1.assert.isOk(node.parameters);
        chai_1.assert.isOk(node.properties);
        chai_1.assert.isUndefined(node.children);
        chai_1.assert.isUndefined(node.child);
    });
    test('Open Node', function () {
        var node = new BaseNode_1["default"]();
        var tick = TickStub_1["default"]();
        node.id = 'node1';
        node._execute(tick);
        var method = tick.blackboard.set.withArgs('isOpen', true, 'tree1', 'node1');
        chai_1.assert.isTrue(method.calledOnce);
    });
    test('Close Node', function () {
        var node = new BaseNode_1["default"]();
        var tick = TickStub_1["default"]();
        node.id = 'node1';
        node._execute(tick);
        var method = tick.blackboard.set.withArgs('isOpen', false, 'tree1', 'node1');
        chai_1.assert.isTrue(method.calledOnce);
    });
    test('Execute is calling functions?', function () {
        var node = new BaseNode_1["default"]();
        var tick = TickStub_1["default"]();
        tick.blackboard.get
            .withArgs('isOpen', 'tree1', 'node1')
            .returns(false);
        node.id = 'node1';
        node.enter = sinon_1.spy();
        node.open = sinon_1.spy();
        node.tick = sinon_1.stub();
        node.tick.returns(constants_1.SUCCESS);
        node.close = sinon_1.spy();
        node.exit = sinon_1.spy();
        node._execute(tick);
        chai_1.assert.isTrue(node.enter.withArgs(tick).calledOnce);
        chai_1.assert.isTrue(node.open.withArgs(tick).calledOnce);
        chai_1.assert.isTrue(node.tick.withArgs(tick).calledOnce);
        chai_1.assert.isTrue(node.close.withArgs(tick).calledOnce);
        chai_1.assert.isTrue(node.exit.withArgs(tick).calledOnce);
    });
    test('Execute does not opening a node already open', function () {
        var node = new BaseNode_1["default"]();
        var tick = TickStub_1["default"]();
        tick.blackboard.get
            .withArgs('isOpen', 'tree1', 'node1')
            .returns(true);
        node.id = 'node1';
        node.open = sinon_1.spy();
        node._execute(tick);
        chai_1.assert.isTrue(node.open.neverCalledWith(tick));
    });
    test('Execute closing the node that does not returns RUNNING', function () {
        var node = new BaseNode_1["default"]();
        var tick = TickStub_1["default"]();
        tick.blackboard.get.returns(false);
        node.id = 'node1';
        node.close = sinon_1.spy();
        node.tick = sinon_1.stub();
        node.tick.returns(constants_1.RUNNING);
        node._execute(tick);
        chai_1.assert.isTrue(node.close.neverCalledWith(tick));
    });
    test('Execute calling tick callbacks', function () {
        var node = new BaseNode_1["default"]();
        var tick = TickStub_1["default"]();
        tick.blackboard.get.returns(false);
        node._execute(tick);
        chai_1.assert.isTrue(tick._enterNode.withArgs(node).calledOnce);
        chai_1.assert.isTrue(tick._openNode.withArgs(node).calledOnce);
        chai_1.assert.isTrue(tick._tickNode.withArgs(node).calledOnce);
        chai_1.assert.isTrue(tick._closeNode.withArgs(node).calledOnce);
        chai_1.assert.isTrue(tick._exitNode.withArgs(node).calledOnce);
    });
});

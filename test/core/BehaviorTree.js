"use strict";
exports.__esModule = true;
var sinon_1 = require("sinon");
var BehaviorTree_1 = require("../../src/core/BehaviorTree");
var chai_1 = require("chai");
// load and dump JSON model
suite('Core: Behavior Tree', function () {
    var getBlackboard = function () {
        return {
            'set': sinon_1.spy(),
            'get': sinon_1.stub()
        };
    };
    var getClosableNode = function (id) {
        return {
            'id': id,
            '_close': sinon_1.spy()
        };
    };
    test('Initialization', function () {
        var tree = new BehaviorTree_1["default"]();
        chai_1.assert.isOk(tree.id);
        chai_1.assert.isOk(tree.title);
        chai_1.assert.isDefined(tree.description);
        chai_1.assert.isDefined(tree.root);
        chai_1.assert.isOk(tree.properties);
    });
    test('Call root', function () {
        var tree = new BehaviorTree_1["default"]();
        var node = { '_execute': sinon_1.stub() };
        var blackboard = getBlackboard();
        var target = {};
        blackboard.get.withArgs('openNodes', 'tree1')
            .returns([]);
        tree.id = 'tree1';
        tree.root = node;
        tree.tick(target, blackboard);
        chai_1.assert.isTrue(node._execute.calledOnce);
    });
    test('Populate blackboard', function () {
        var tree = new BehaviorTree_1["default"]();
        var blackboard = getBlackboard();
        var target = {};
        var node = { '_execute': function (tick) {
                tick._enterNode('node1'),
                    tick._enterNode('node2');
            } };
        blackboard.get.withArgs('openNodes', 'tree1')
            .returns([]);
        tree.id = 'tree1';
        tree.root = node;
        tree.tick(target, blackboard);
        var method = blackboard.set.withArgs('openNodes', ['node1', 'node2'], 'tree1');
        chai_1.assert.isTrue(method.calledOnce);
        method = blackboard.set.withArgs('nodeCount', 2, 'tree1');
        chai_1.assert.isTrue(method.calledOnce);
    });
    test('Close opened nodes', function () {
        var tree = new BehaviorTree_1["default"]();
        var blackboard = getBlackboard();
        var node1 = getClosableNode('node1');
        var node2 = getClosableNode('node2');
        var node3 = getClosableNode('node3');
        var node4 = getClosableNode('node4');
        var node5 = getClosableNode('node5');
        var node6 = getClosableNode('node6');
        var node7 = getClosableNode('node7');
        var root = { '_execute': function (tick) {
                tick._enterNode(node1);
                tick._enterNode(node2);
                tick._enterNode(node3);
            } };
        blackboard.get.withArgs('openNodes', 'tree1')
            .returns([node1, node2, node3, node4, node5, node6, node7])
            .withArgs('nodeCount', 'tree1')
            .returns(7);
        tree.id = 'tree1';
        tree.root = root;
        tree.tick(null, blackboard);
        chai_1.assert.isTrue(node7._close.calledOnce);
        chai_1.assert.isTrue(node6._close.calledOnce);
        chai_1.assert.isTrue(node5._close.calledOnce);
        chai_1.assert.isTrue(node4._close.calledOnce);
        chai_1.assert.isFalse(node3._close.called);
        chai_1.assert.isFalse(node2._close.called);
        chai_1.assert.isFalse(node1._close.called);
    });
    test('Does not close opened nodes', function () {
        var tree = new BehaviorTree_1["default"]();
        var blackboard = getBlackboard();
        var node1 = getClosableNode('node1');
        var node2 = getClosableNode('node2');
        var node3 = getClosableNode('node3');
        var node4 = getClosableNode('node4');
        var root = { '_execute': function (tick) {
                tick._enterNode(node1);
                tick._enterNode(node2);
                tick._enterNode(node3);
                tick._enterNode(node4);
            } };
        blackboard.get.withArgs('openNodes', 'tree1')
            .returns([node1, node2])
            .withArgs('nodeCount', 'tree1')
            .returns(2);
        tree.id = 'tree1';
        tree.root = root;
        tree.tick(null, blackboard);
        chai_1.assert.isFalse(node4._close.called);
        chai_1.assert.isFalse(node3._close.called);
        chai_1.assert.isFalse(node2._close.called);
        chai_1.assert.isFalse(node1._close.called);
    });
});

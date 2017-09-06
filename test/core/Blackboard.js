"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var Blackboard_1 = require("../../src/core/Blackboard");
/* BLACKBOARD ============================================================== */
suite('Core: Blackboard', function () {
    test('Basic Read & Write operations', function () {
        var blackboard = new Blackboard_1["default"]();
        blackboard.set('var1', 'this is some value');
        blackboard.set('var2', 999888);
        chai_1.assert.equal(blackboard.get('var1'), 'this is some value');
        chai_1.assert.equal(blackboard.get('var2'), 999888);
        chai_1.assert.equal(blackboard.get('var3'), undefined);
    });
    test('Tree memory initialization', function () {
        var blackboard = new Blackboard_1["default"]();
        blackboard.set('var1', 'value', 'tree1');
        chai_1.assert.isDefined(blackboard.get('var1', 'tree1'));
        chai_1.assert.isDefined(blackboard.get('nodeMemory', 'tree1'));
        chai_1.assert.isDefined(blackboard.get('openNodes', 'tree1'));
        chai_1.assert.isDefined(blackboard.get('traversalCycle', 'tree1'));
    });
    test('Read & Write operations within Tree Scope', function () {
        var blackboard = new Blackboard_1["default"]();
        blackboard.set('var1', 'this is some value', 'tree 1');
        blackboard.set('var2', 999888, 'tree 2');
        chai_1.assert.equal(blackboard.get('var1', 'tree 1'), 'this is some value');
        chai_1.assert.equal(blackboard.get('var2', 'tree 2'), 999888);
        chai_1.assert.equal(blackboard.get('var1', 'tree 2'), undefined);
        chai_1.assert.equal(blackboard.get('var2', 'tree 1'), undefined);
    });
    test('Read & Write operations within Tree and Node Scopes', function () {
        var blackboard = new Blackboard_1["default"]();
        blackboard.set('var1', 'value 1', 'tree 1');
        blackboard.set('var2', 'value 2', 'tree 1', 'node 1');
        blackboard.set('var3', 'value 3', 'tree 1', 'node 2');
        blackboard.set('var4', 999888, 'tree 2');
        chai_1.assert.equal(blackboard.get('var2', 'tree 1', 'node 1'), 'value 2');
        chai_1.assert.equal(blackboard.get('var3', 'tree 1', 'node 2'), 'value 3');
        chai_1.assert.equal(blackboard.get('var2', 'tree 1', 'node 2'), undefined);
        chai_1.assert.equal(blackboard.get('var3', 'tree 1', 'node 1'), undefined);
        chai_1.assert.equal(blackboard.get('var2', 'tree 1'), undefined);
        chai_1.assert.equal(blackboard.get('var1', 'tree 1', 'node 1'), undefined);
        chai_1.assert.equal(blackboard.get('var2', 'tree 2', 'node 1'), undefined);
    });
});
/* ========================================================================= */

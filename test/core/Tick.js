"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var Tick_1 = require("../../src/core/Tick");
// store open children
// call debug
suite('Core: Tick', function () {
    test('Initialization', function () {
        var tick = new Tick_1["default"]();
        chai_1.assert.equal(tick._nodeCount, 0);
        chai_1.assert.equal(tick._openNodes.length, 0);
    });
    test('Updating tick info on enter', function () {
        var tick = new Tick_1["default"]();
        var node = { 'id': 'node1' };
        tick._enterNode(node);
        chai_1.assert.equal(tick._nodeCount, 1);
        chai_1.assert.equal(tick._openNodes.length, 1);
        chai_1.assert.strictEqual(tick._openNodes[0], node);
    });
    test('Updating tick info on close', function () {
        var tick = new Tick_1["default"]();
        var node = { 'id': 'node1' };
        tick._nodeCount = 1;
        tick._openNodes = [node];
        tick._closeNode(node);
        chai_1.assert.equal(tick._nodeCount, 1);
        chai_1.assert.equal(tick._openNodes.length, 0);
    });
    test.skip('Callbacks calling debug');
});

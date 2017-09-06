"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var Composite_1 = require("../../src/core/Composite");
var constants_1 = require("../../src/constants");
suite('Core: Composite', function () {
    test('Prototype', function () {
        chai_1.assert.equal(Composite_1["default"].prototype.category, constants_1.COMPOSITE);
    });
    test('Initialization', function () {
        var node = new Composite_1["default"]({ children: ['child1', 'child2'] });
        chai_1.assert.isOk(node.id);
        chai_1.assert.isDefined(node.title);
        chai_1.assert.isDefined(node.description);
        chai_1.assert.isOk(node.children);
        chai_1.assert.equal(node.category, 'composite');
        chai_1.assert.equal(node.children[0], 'child1');
        chai_1.assert.equal(node.children[1], 'child2');
    });
});

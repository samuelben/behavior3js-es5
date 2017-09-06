"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var Decorator_1 = require("../../src/core/Decorator");
var constants_1 = require("../../src/constants");
suite('Core: Decorator', function () {
    test('Prototype', function () {
        chai_1.assert.equal(Decorator_1["default"].prototype.category, constants_1.DECORATOR);
    });
    test('Initialization', function () {
        var node = new Decorator_1["default"]({ child: 'child1' });
        chai_1.assert.isOk(node.id);
        chai_1.assert.isDefined(node.title);
        chai_1.assert.isDefined(node.description);
        chai_1.assert.equal(node.child, 'child1');
        chai_1.assert.equal(node.category, 'decorator');
    });
});

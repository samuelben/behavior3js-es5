"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var Condition_1 = require("../../src/core/Condition");
var constants_1 = require("../../src/constants");
suite('Core: Condition', function () {
    test('Prototype', function () {
        chai_1.assert.equal(Condition_1["default"].prototype.category, constants_1.CONDITION);
    });
    test('Initialization', function () {
        var node = new Condition_1["default"]();
        chai_1.assert.isOk(node.id);
        chai_1.assert.isDefined(node.title);
        chai_1.assert.isDefined(node.description);
        chai_1.assert.equal(node.category, 'condition');
    });
});

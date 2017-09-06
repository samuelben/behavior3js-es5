"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var Action_1 = require("../../src/core/Action");
var constants_1 = require("../../src/constants");
suite('Core: Action', function () {
    test('Prototype', function () {
        chai_1.assert.equal(Action_1["default"].prototype.category, constants_1.ACTION);
    });
    test('Initialization', function () {
        var node = new Action_1["default"]();
        chai_1.assert.isOk(node.id);
        chai_1.assert.isDefined(node.title);
        chai_1.assert.isDefined(node.description);
        chai_1.assert.equal(node.category, 'action');
    });
});

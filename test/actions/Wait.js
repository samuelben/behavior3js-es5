"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var TickStub_1 = require("../TickStub");
var utils_1 = require("../utils");
var Wait_1 = require("../../src/actions/Wait");
var constants_1 = require("../../src/constants");
suite('Action: Wait', function () {
    test('Prototype', function () {
        chai_1.assert.equal(Wait_1["default"].prototype.name, 'Wait');
    });
    test('Tick', function () {
        var wait = new Wait_1["default"]({ milliseconds: 15 });
        wait.id = 'node1';
        var tick = TickStub_1["default"]();
        tick.blackboard.get
            .onCall(0).returns(false)
            .onCall(1).returns(true);
        tick.blackboard.get
            .withArgs('startTime', 'tree1', 'node1')
            .returns((new Date()).getTime());
        var startTime = (new Date()).getTime();
        var status = wait._execute(tick);
        chai_1.assert.equal(status, constants_1.RUNNING);
        while ((new Date()).getTime() - startTime < 25) {
            utils_1.sleep(1);
        }
        var status = wait._execute(tick);
        chai_1.assert.equal(status, constants_1.SUCCESS);
    });
});

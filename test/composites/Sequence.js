"use strict";
exports.__esModule = true;
var sinon_1 = require("sinon");
var chai_1 = require("chai");
var Sequence_1 = require("../../src/composites/Sequence");
var constants_1 = require("../../src/constants");
suite('Composite: Sequence', function () {
    var getNode = function (status) {
        var _execute = sinon_1.stub();
        _execute.returns(status);
        return { '_execute': _execute };
    };
    var getTick = function () {
        return {
            'tickNode': sinon_1.spy()
        };
    };
    test('Prototype', function () {
        chai_1.assert.equal(Sequence_1["default"].prototype.name, 'Sequence');
    });
    test('Success', function () {
        var node1 = getNode(constants_1.SUCCESS);
        var node2 = getNode(constants_1.SUCCESS);
        var node3 = getNode(constants_1.SUCCESS);
        var sequence = new Sequence_1["default"]({ children: [node1, node2, node3] });
        var status = sequence.tick(getTick());
        chai_1.assert.equal(status, constants_1.SUCCESS);
        chai_1.assert.isTrue(node1._execute.calledOnce);
        chai_1.assert.isTrue(node2._execute.calledOnce);
        chai_1.assert.isTrue(node3._execute.calledOnce);
    });
    test('Failure', function () {
        var node1 = getNode(constants_1.SUCCESS);
        var node2 = getNode(constants_1.SUCCESS);
        var node3 = getNode(constants_1.FAILURE);
        var node4 = getNode(constants_1.SUCCESS);
        var sequence = new Sequence_1["default"]({ children: [node1, node2, node3, node4] });
        var status = sequence.tick(getTick());
        chai_1.assert.equal(status, constants_1.FAILURE);
        chai_1.assert.isTrue(node1._execute.calledOnce);
        chai_1.assert.isTrue(node2._execute.calledOnce);
        chai_1.assert.isTrue(node3._execute.calledOnce);
        chai_1.assert.isFalse(node4._execute.called);
    });
    test('Running', function () {
        var node1 = getNode(constants_1.SUCCESS);
        var node2 = getNode(constants_1.SUCCESS);
        var node3 = getNode(constants_1.RUNNING);
        var node4 = getNode(constants_1.SUCCESS);
        var sequence = new Sequence_1["default"]({ children: [node1, node2, node3, node4] });
        var status = sequence.tick(getTick());
        chai_1.assert.equal(status, constants_1.RUNNING);
        chai_1.assert.isTrue(node1._execute.calledOnce);
        chai_1.assert.isTrue(node2._execute.calledOnce);
        chai_1.assert.isTrue(node3._execute.calledOnce);
        chai_1.assert.isFalse(node4._execute.called);
    });
});

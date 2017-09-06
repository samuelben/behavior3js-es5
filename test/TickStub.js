"use strict";
exports.__esModule = true;
var sinon_1 = require("sinon");
function TickStub() {
    return {
        'tree': { 'id': 'tree1' },
        'blackboard': {
            'set': sinon_1.spy(),
            'get': sinon_1.stub()
        },
        'openNodes': [],
        'nodeCount': 0,
        '_enterNode': sinon_1.spy(),
        '_openNode': sinon_1.spy(),
        '_tickNode': sinon_1.spy(),
        '_closeNode': sinon_1.spy(),
        '_exitNode': sinon_1.spy()
    };
}
exports["default"] = TickStub;

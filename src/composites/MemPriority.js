"use strict";
exports.__esModule = true;
var b3_functions_1 = require("../b3.functions");
var Composite_1 = require("../core/Composite");
var constants_1 = require("../constants");
/**
 * MemPriority is similar to Priority node, but when a child returns a
 * `RUNNING` state, its index is recorded and in the next tick the,
 * MemPriority calls the child recorded directly, without calling previous
 * children again.
 *
 * @module b3
 * @class MemPriority
 * @extends Composite
 **/
exports["default"] = b3_functions_1.Class(Composite_1["default"], {
    /**
     * Node name. Default to `MemPriority`.
     * @property {String} name
     * @readonly
     **/
    name: 'MemPriority',
    /**
     * Open method.
     * @method open
     * @param {b3.Tick} tick A tick instance.
     **/
    open: function (tick) {
        tick.blackboard.set('runningChild', 0, tick.tree.id, this.id);
    },
    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} A state constant.
     **/
    tick: function (tick) {
        var child = tick.blackboard.get('runningChild', tick.tree.id, this.id);
        for (var i = child; i < this.children.length; i++) {
            var status = this.children[i]._execute(tick);
            if (status !== constants_1.FAILURE) {
                if (status === constants_1.RUNNING) {
                    tick.blackboard.set('runningChild', i, tick.tree.id, this.id);
                }
                return status;
            }
        }
        return constants_1.FAILURE;
    }
});

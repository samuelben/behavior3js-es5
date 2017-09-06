"use strict";
exports.__esModule = true;
var b3_functions_1 = require("../b3.functions");
var Composite_1 = require("../core/Composite");
var constants_1 = require("../constants");
/**
 * The Sequence node ticks its children sequentially until one of them
 * returns `FAILURE`, `RUNNING` or `ERROR`. If all children return the
 * success state, the sequence also returns `SUCCESS`.
 *
 * @module b3
 * @class Sequence
 * @extends Composite
 **/
exports["default"] = b3_functions_1.Class(Composite_1["default"], {
    /**
     * Node name. Default to `Sequence`.
     * @property {String} name
     * @readonly
     **/
    name: 'Sequence',
    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} A state constant.
     **/
    tick: function (tick) {
        for (var i = 0; i < this.children.length; i++) {
            var status = this.children[i]._execute(tick);
            if (status !== constants_1.SUCCESS) {
                return status;
            }
        }
        return constants_1.SUCCESS;
    }
});

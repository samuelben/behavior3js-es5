"use strict";
exports.__esModule = true;
var b3_functions_1 = require("../b3.functions");
var Composite_1 = require("../core/Composite");
var constants_1 = require("../constants");
/**
 * Priority ticks its children sequentially until one of them returns
 * `SUCCESS`, `RUNNING` or `ERROR`. If all children return the failure state,
 * the priority also returns `FAILURE`.
 *
 * @module b3
 * @class Priority
 * @extends Composite
 **/
exports["default"] = b3_functions_1.Class(Composite_1["default"], {
    /**
     * Node name. Default to `Priority`.
     * @property {String} name
     * @readonly
     **/
    name: 'Priority',
    /**
     * Tick method.
     * @method tick
     * @param {Tick} tick A tick instance.
     * @return {Constant} A state constant.
     **/
    tick: function (tick) {
        for (var i = 0; i < this.children.length; i++) {
            var status = this.children[i]._execute(tick);
            if (status !== constants_1.FAILURE) {
                return status;
            }
        }
        return constants_1.FAILURE;
    }
});

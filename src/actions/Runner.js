"use strict";
exports.__esModule = true;
var b3_functions_1 = require("../b3.functions");
var Action_1 = require("../core/Action");
var constants_1 = require("../constants");
/**
 * This action node returns RUNNING always.
 *
 * @module b3
 * @class Runner
 * @extends Action
 **/
exports["default"] = b3_functions_1.Class(Action_1["default"], {
    /**
     * Node name. Default to `Runner`.
     * @property {String} name
     * @readonly
     **/
    name: 'Runner',
    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} Always return `RUNNING`.
     **/
    tick: function (tick) {
        return constants_1.RUNNING;
    }
});

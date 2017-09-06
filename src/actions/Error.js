"use strict";
exports.__esModule = true;
var constants_1 = require("../constants");
var b3_functions_1 = require("../b3.functions");
var Action_1 = require("../core/Action");
/**
 * This action node returns `ERROR` always.
 *
 * @module b3
 * @class Error
 * @extends Action
 **/
exports["default"] = b3_functions_1.Class(Action_1["default"], {
    /**
     * Node name. Default to `Error`.
     * @property {String} name
     * @readonly
     **/
    name: 'Error',
    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} Always return `ERROR`.
     **/
    tick: function (tick) {
        return constants_1.ERROR;
    }
});

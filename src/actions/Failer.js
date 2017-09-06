"use strict";
exports.__esModule = true;
var b3_functions_1 = require("../b3.functions");
var Action_1 = require("../core/Action");
var constants_1 = require("../constants");
/**
 * This action node returns `FAILURE` always.
 *
 * @module b3
 * @class Failer
 * @extends Action
 **/
exports["default"] = b3_functions_1.Class(Action_1["default"], {
    /**
     * Node name. Default to `Failer`.
     * @property {String} name
     * @readonly
     **/
    name: 'Failer',
    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} Always return `FAILURE`.
     **/
    tick: function (tick) {
        return constants_1.FAILURE;
    }
});

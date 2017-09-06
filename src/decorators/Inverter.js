"use strict";
exports.__esModule = true;
var b3_functions_1 = require("../b3.functions");
var Decorator_1 = require("../core/Decorator");
var constants_1 = require("../constants");
/**
 * The Inverter decorator inverts the result of the child, returning `SUCCESS`
 * for `FAILURE` and `FAILURE` for `SUCCESS`.
 *
 * @module b3
 * @class Inverter
 * @extends Decorator
 **/
exports["default"] = b3_functions_1.Class(Decorator_1["default"], {
    /**
     * Node name. Default to `Inverter`.
     * @property {String} name
     * @readonly
     **/
    name: 'Inverter',
    /**
     * Tick method.
     * @method tick
     * @param {Tick} tick A tick instance.
     * @return {Constant} A state constant.
     **/
    tick: function (tick) {
        if (!this.child) {
            return constants_1.ERROR;
        }
        var status = this.child._execute(tick);
        if (status == constants_1.SUCCESS) {
            status = constants_1.FAILURE;
        }
        else if (status == constants_1.FAILURE) {
            status = constants_1.SUCCESS;
        }
        return status;
    }
});

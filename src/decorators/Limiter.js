"use strict";
exports.__esModule = true;
var b3_functions_1 = require("../b3.functions");
var Decorator_1 = require("../core/Decorator");
var constants_1 = require("../constants");
/**
 * This decorator limit the number of times its child can be called. After a
 * certain number of times, the Limiter decorator returns `FAILURE` without
 * executing the child.
 *
 * @module b3
 * @class Limiter
 * @extends Decorator
 **/
exports["default"] = b3_functions_1.Class(Decorator_1["default"], {
    /**
     * Node name. Default to `Limiter`.
     * @property {String} name
     * @readonly
     **/
    name: 'Limiter',
    /**
     * Node title. Default to `Limit X Activations`. Used in Editor.
     * @property {String} title
     * @readonly
     **/
    title: 'Limit <maxLoop> Activations',
    /**
     * Node parameters.
     * @property {String} parameters
     * @readonly
     **/
    parameters: { 'maxLoop': 1 },
    /**
     * Initialization method.
     *
     * Settings parameters:
     *
     * - **maxLoop** (*Integer*) Maximum number of repetitions.
     * - **child** (*BaseNode*) The child node.
     *
     * @method initialize
     * @param {Object} params Object with parameters.
     * @constructor
     **/
    initialize: function (params) {
        Decorator_1["default"].prototype.initialize.call(this, params);
        if (!params.maxLoop) {
            throw "maxLoop parameter in Limiter decorator is an obligatory " +
                "parameter";
        }
        this.maxLoop = params.maxLoop;
    },
    /**
     * Open method.
     * @method open
     * @param {Tick} tick A tick instance.
     **/
    open: function (tick) {
        tick.blackboard.set('i', 0, tick.tree.id, this.id);
    },
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
        var i = tick.blackboard.get('i', tick.tree.id, this.id);
        if (i < this.maxLoop) {
            var status = this.child._execute(tick);
            if (status == constants_1.SUCCESS || status == constants_1.FAILURE)
                tick.blackboard.set('i', i + 1, tick.tree.id, this.id);
            return status;
        }
        return constants_1.FAILURE;
    }
});

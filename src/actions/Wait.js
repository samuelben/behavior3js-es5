"use strict";
exports.__esModule = true;
var b3_functions_1 = require("../b3.functions");
var Action_1 = require("../core/Action");
var constants_1 = require("../constants");
/**
 * Wait a few seconds.
 *
 * @module b3
 * @class Wait
 * @extends Action
 **/
exports["default"] = b3_functions_1.Class(Action_1["default"], {
    /**
     * Node name. Default to `Wait`.
     * @property {String} name
     * @readonly
     **/
    name: 'Wait',
    /**
     * Node title. Default to `Wait XXms`. Used in Editor.
     * @property {String} title
     * @readonly
     **/
    title: 'Wait <milliseconds>ms',
    /**
     * Node parameters.
     * @property {String} parameters
     * @readonly
     **/
    parameters: { 'milliseconds': 0 },
    /**
     * Initialization method.
     *
     * Settings parameters:
     *
     * - **milliseconds** (*Integer*) Maximum time, in milliseconds, a child
     *                                can execute.
     *
     * @method initialize
     * @param {Object} settings Object with parameters.
     * @constructor
     **/
    initialize: function (settings) {
        settings = settings || {};
        Action_1["default"].prototype.initialize.call(this);
        this.endTime = settings.milliseconds || 0;
    },
    /**
     * Open method.
     * @method open
     * @param {Tick} tick A tick instance.
     **/
    open: function (tick) {
        var startTime = (new Date()).getTime();
        tick.blackboard.set('startTime', startTime, tick.tree.id, this.id);
    },
    /**
     * Tick method.
     * @method tick
     * @param {Tick} tick A tick instance.
     * @return {Constant} A state constant.
     **/
    tick: function (tick) {
        var currTime = (new Date()).getTime();
        var startTime = tick.blackboard.get('startTime', tick.tree.id, this.id);
        if (currTime - startTime > this.endTime) {
            return constants_1.SUCCESS;
        }
        return constants_1.RUNNING;
    }
});

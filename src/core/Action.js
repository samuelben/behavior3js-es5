"use strict";
exports.__esModule = true;
var b3_functions_1 = require("../b3.functions");
var BaseNode_1 = require("../core/BaseNode");
var constants_1 = require("../constants");
/**
 * Action is the base class for all action nodes. Thus, if you want to create
 * new custom action nodes, you need to inherit from this class. For example,
 * take a look at the Runner action:
 *
 *     var Runner = b3.Class(b3.Action, {
 *       name: 'Runner',
 *
 *       tick: function(tick) {
 *         return b3.RUNNING;
 *       }
 *     });
 *
 * @module b3
 * @class Action
 * @extends BaseNode
 **/
exports["default"] = b3_functions_1.Class(BaseNode_1["default"], {
    /**
     * Node category. Default to `ACTION`.
     * @property {String} category
     * @readonly
     **/
    category: constants_1.ACTION,
    /**
     * Initialization method.
     * @method initialize
     * @constructor
     **/
    initialize: function (params) {
        BaseNode_1["default"].prototype.initialize.call(this);
    }
});

"use strict";
exports.__esModule = true;
var b3_functions_1 = require("../b3.functions");
var BaseNode_1 = require("./BaseNode");
var constants_1 = require("../constants");
/**
 * Condition is the base class for all condition nodes. Thus, if you want to
 * create new custom condition nodes, you need to inherit from this class.
 *
 * @class Condition
 * @extends BaseNode
 **/
exports["default"] = b3_functions_1.Class(BaseNode_1["default"], {
    /**
     * Node category. Default to `b3.CONDITION`.
     * @property {String} category
     * @readonly
     **/
    category: constants_1.CONDITION,
    /**
     * Initialization method.
     * @method initialize
     * @constructor
     **/
    initialize: function (params) {
        BaseNode_1["default"].prototype.initialize.call(this);
    }
});

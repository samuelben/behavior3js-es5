"use strict";
exports.__esModule = true;
var b3_functions_1 = require("../b3.functions");
var BaseNode_1 = require("../core/BaseNode");
var constants_1 = require("../constants");
/**
 * Composite is the base class for all composite nodes. Thus, if you want to
 * create new custom composite nodes, you need to inherit from this class.
 *
 * When creating composite nodes, you will need to propagate the tick signal
 * to the children nodes manually. To do that, override the `tick` method and
 * call the `_execute` method on all nodes. For instance, take a look at how
 * the Sequence node inherit this class and how it call its children:
 *
 *     // Inherit from Composite, using the util function Class.
 *     var Sequence = Class(Composite, {
 *
 *       // Remember to set the name of the node.
 *       name: 'Sequence',
 *
 *       // Override the tick function
 *       tick: function(tick) {
 *
 *         // Iterates over the children
 *         for (var i=0; i<this.children.length; i++) {
 *
 *           // Propagate the tick
 *           var status = this.children[i]._execute(tick);
 *
 *           if (status !== SUCCESS) {
 *               return status;
 *           }
 *         }
 *
 *         return SUCCESS;
 *       }
 *     });
 *
 * @module b3
 * @class Composite
 * @extends BaseNode
 **/
exports["default"] = b3_functions_1.Class(BaseNode_1["default"], {
    /**
     * Node category. Default to `b3.COMPOSITE`.
     *
     * @property category
     * @type {String}
     * @readonly
     **/
    category: constants_1.COMPOSITE,
    /**
     * Initialization method.
     *
     * @method initialize
     * @constructor
     **/
    initialize: function (params) {
        BaseNode_1["default"].prototype.initialize.call(this);
        this.children = (params.children || []).slice(0);
    }
});

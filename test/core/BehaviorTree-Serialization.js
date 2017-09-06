"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var BehaviorTree_1 = require("../../src/core/BehaviorTree");
var Priority_1 = require("../../src/composites/Priority");
var MemSequence_1 = require("../../src/composites/MemSequence");
var Inverter_1 = require("../../src/decorators/Inverter");
var MaxTime_1 = require("../../src/decorators/MaxTime");
var Condition_1 = require("../../src/core/Condition");
var Wait_1 = require("../../src/actions/Wait");
var constants_1 = require("../../src/constants");
var b3_functions_1 = require("../../src/b3.functions");
// load and dump JSON model
suite('Core: Behavior Tree - Serialization', function () {
    test('Load JSON with default nodes', function () {
        var tree = new BehaviorTree_1["default"]();
        var data = {
            'title': 'A JSON Behavior Tree',
            'description': 'This description',
            'root': '1',
            'properties': {
                'variable': 'value'
            },
            'nodes': {
                // Test properties and children
                '1': {
                    'id': '1',
                    'name': 'Priority',
                    'title': 'Root Node',
                    'description': 'Root Description',
                    'children': ['2', '3'],
                    'properties': {
                        'var1': 123,
                        'composite': {
                            'var2': true,
                            'var3': 'value'
                        }
                    }
                },
                // Test child
                '2': {
                    'name': 'Inverter',
                    'title': 'Node 1',
                    'description': 'Node 1 Description',
                    'child': '4'
                },
                '3': {
                    'name': 'MemSequence',
                    'title': 'Node 2',
                    'description': 'Node 2 Description',
                    'children': []
                },
                // Test parameters
                '4': {
                    'name': 'MaxTime',
                    'title': 'Node 3',
                    'description': 'Node 3 Description',
                    'child': null,
                    'properties': {
                        'maxTime': 1 // works as constructor argument now
                    },
                    'parameters': {
                        'maxTime': 999 // does not affect anymore
                    }
                }
            }
        };
        tree.load(data);
        // Tree information
        chai_1.assert.equal(tree.title, 'A JSON Behavior Tree');
        chai_1.assert.equal(tree.description, 'This description');
        chai_1.assert.isDefined(tree.properties);
        chai_1.assert.equal(tree.properties['variable'], 'value');
        // Root
        chai_1.assert.instanceOf(tree.root, Priority_1["default"]);
        chai_1.assert.equal(tree.root.id, '1');
        chai_1.assert.equal(tree.root.title, 'Root Node');
        chai_1.assert.equal(tree.root.description, 'Root Description');
        chai_1.assert.equal(tree.root.children.length, 2);
        chai_1.assert.isDefined(tree.root.properties);
        chai_1.assert.equal(tree.root.properties['var1'], 123);
        chai_1.assert.isDefined(tree.root.properties['composite']);
        chai_1.assert.equal(tree.root.properties['composite']['var2'], true);
        chai_1.assert.equal(tree.root.properties['composite']['var3'], 'value');
        // Node 1
        var node = tree.root.children[0];
        chai_1.assert.instanceOf(node, Inverter_1["default"]);
        chai_1.assert.equal(node.title, 'Node 1');
        chai_1.assert.equal(node.description, 'Node 1 Description');
        chai_1.assert.isDefined(node.child);
        // Node 2
        var node = tree.root.children[1];
        chai_1.assert.instanceOf(node, MemSequence_1["default"]);
        chai_1.assert.equal(node.title, 'Node 2');
        chai_1.assert.equal(node.description, 'Node 2 Description');
        chai_1.assert.equal(node.children.length, 0);
        // Node 3
        var node = tree.root.children[0].child;
        chai_1.assert.instanceOf(node, MaxTime_1["default"]);
        chai_1.assert.equal(node.title, 'Node 3');
        chai_1.assert.equal(node.description, 'Node 3 Description');
        chai_1.assert.notEqual(node.parameters['maxTime'], 999);
    });
    test('Load JSON model with custom nodes', function () {
        var tree = new BehaviorTree_1["default"]();
        var CustomNode = b3_functions_1.Class(Condition_1["default"]);
        var data = {
            'title': 'A JSON Behavior Tree',
            'description': 'This descriptions',
            'root': '1',
            'nodes': {
                '1': {
                    'name': 'Priority',
                    'title': 'Root Node',
                    'description': 'Root Description',
                    'children': ['2']
                },
                '2': {
                    'name': 'CustomNode',
                    'title': 'Node 2',
                    'description': 'Node 2 Description'
                }
            }
        };
        tree.load(data, { 'CustomNode': CustomNode });
        // Root
        chai_1.assert.instanceOf(tree.root, Priority_1["default"]);
        chai_1.assert.equal(tree.root.title, 'Root Node');
        chai_1.assert.equal(tree.root.description, 'Root Description');
        chai_1.assert.equal(tree.root.children.length, 1);
        // Node 2
        var node = tree.root.children[0];
        chai_1.assert.instanceOf(node, CustomNode);
        chai_1.assert.equal(node.title, 'Node 2');
        chai_1.assert.equal(node.description, 'Node 2 Description');
    });
    test('Dump JSON model', function () {
        var tree = new BehaviorTree_1["default"]();
        var CustomNode = b3_functions_1.Class(Condition_1["default"]);
        CustomNode.prototype.name = 'CustomNode';
        CustomNode.prototype.title = 'custom';
        tree.properties = {
            'prop': 'value',
            'comp': {
                'val1': 234,
                'val2': 'value'
            }
        };
        var node5 = new CustomNode();
        node5.id = 'node-5';
        node5.title = 'Node5';
        node5.description = 'Node 5 Description';
        var node4 = new Wait_1["default"]();
        node4.id = 'node-4';
        node4.title = 'Node4';
        node4.description = 'Node 4 Description';
        var node3 = new MemSequence_1["default"]({ children: [node5] });
        node3.id = 'node-3';
        node3.title = 'Node3';
        node3.description = 'Node 3 Description';
        var node2 = new Inverter_1["default"]({ child: node4 });
        node2.id = 'node-2';
        node2.title = 'Node2';
        node2.description = 'Node 2 Description';
        var node1 = new Priority_1["default"]({ children: [node2, node3] });
        node1.id = 'node-1';
        node1.title = 'Node1';
        node1.description = 'Node 1 Description';
        node1.properties = {
            'key': 'value'
        };
        tree.root = node1;
        tree.title = 'Title in Tree';
        tree.description = 'Tree Description';
        var data = tree.dump();
        chai_1.assert.equal(data['title'], 'Title in Tree');
        chai_1.assert.equal(data['description'], 'Tree Description');
        chai_1.assert.equal(data['root'], 'node-1');
        chai_1.assert.equal(data['properties']['prop'], 'value');
        chai_1.assert.equal(data['properties']['comp']['val1'], 234);
        chai_1.assert.equal(data['properties']['comp']['val2'], 'value');
        chai_1.assert.isDefined(data['custom_nodes']);
        chai_1.assert.equal(data['custom_nodes'].length, 1);
        chai_1.assert.equal(data['custom_nodes'][0]['name'], 'CustomNode');
        chai_1.assert.equal(data['custom_nodes'][0]['title'], 'custom');
        chai_1.assert.equal(data['custom_nodes'][0]['category'], constants_1.CONDITION);
        chai_1.assert.isDefined(data['nodes']['node-1']);
        chai_1.assert.isDefined(data['nodes']['node-2']);
        chai_1.assert.isDefined(data['nodes']['node-3']);
        chai_1.assert.isDefined(data['nodes']['node-4']);
        chai_1.assert.isDefined(data['nodes']['node-5']);
        chai_1.assert.equal(data['nodes']['node-1']['id'], 'node-1');
        chai_1.assert.equal(data['nodes']['node-1']['name'], 'Priority');
        chai_1.assert.equal(data['nodes']['node-1']['title'], 'Node1');
        chai_1.assert.equal(data['nodes']['node-1']['description'], 'Node 1 Description');
        chai_1.assert.equal(data['nodes']['node-1']['children'][0], 'node-3');
        chai_1.assert.equal(data['nodes']['node-1']['children'][1], 'node-2');
        chai_1.assert.equal(data['nodes']['node-1']['properties']['key'], 'value');
        chai_1.assert.equal(data['nodes']['node-2']['name'], 'Inverter');
        chai_1.assert.equal(data['nodes']['node-2']['title'], 'Node2');
        chai_1.assert.equal(data['nodes']['node-2']['description'], 'Node 2 Description');
        chai_1.assert.isOk(data['nodes']['node-2']['child']);
        chai_1.assert.equal(data['nodes']['node-3']['name'], 'MemSequence');
        chai_1.assert.equal(data['nodes']['node-3']['title'], 'Node3');
        chai_1.assert.equal(data['nodes']['node-3']['description'], 'Node 3 Description');
        chai_1.assert.equal(data['nodes']['node-3']['children'].length, 1);
        chai_1.assert.equal(data['nodes']['node-4']['name'], 'Wait');
        chai_1.assert.equal(data['nodes']['node-4']['title'], 'Node4');
        chai_1.assert.equal(data['nodes']['node-4']['description'], 'Node 4 Description');
        chai_1.assert.isUndefined(data['nodes']['node-4']['children']);
        chai_1.assert.isUndefined(data['nodes']['node-4']['child']);
        chai_1.assert.equal(data['nodes']['node-5']['name'], 'CustomNode');
        chai_1.assert.equal(data['nodes']['node-5']['title'], 'Node5');
        chai_1.assert.equal(data['nodes']['node-5']['description'], 'Node 5 Description');
        chai_1.assert.isUndefined(data['nodes']['node-5']['children']);
        chai_1.assert.isUndefined(data['nodes']['node-5']['child']);
    });
});

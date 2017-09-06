import {assert} from 'chai';
import Action from '../../src/core/Action';
import {ACTION} from '../../src/constants';

suite('Core: Action', function() {
    test('Prototype', function() {
        assert.equal(Action.prototype.category, ACTION);
    });

    test('Initialization', function() {
        var node = new Action();

        assert.isOk(node.id);
        assert.isDefined(node.title);
        assert.isDefined(node.description);
        assert.equal(node.category, 'action');
    });
});

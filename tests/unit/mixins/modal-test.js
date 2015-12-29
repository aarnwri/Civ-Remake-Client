import Ember from 'ember';
import ModalMixin from '../../../mixins/modal';
import { module, test } from 'qunit';

module('Unit | Mixin | modal');

// Replace this with your real tests.
test('it works', function(assert) {
  var ModalObject = Ember.Object.extend(ModalMixin);
  var subject = ModalObject.create();
  assert.ok(subject);
});

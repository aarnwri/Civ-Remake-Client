import Ember from 'ember';
import ModalFormMixin from '../../../mixins/modal-form';
import { module, test } from 'qunit';

module('Unit | Mixin | modal form');

// Replace this with your real tests.
test('it works', function(assert) {
  var ModalFormObject = Ember.Object.extend(ModalFormMixin);
  var subject = ModalFormObject.create();
  assert.ok(subject);
});

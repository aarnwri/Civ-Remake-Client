import DS from 'ember-data';

export default DS.Model.extend({
  removeSelf: function () {
    this.transitionTo('created.uncommitted');
    this.unloadRecord();
  }
});

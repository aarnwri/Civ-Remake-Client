import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function () {
    console.log('in application route');
    this.transitionTo('login');
  }
});

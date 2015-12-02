import Ember from 'ember';

export default Ember.Route.extend({

  model: function () {
    return this.store.findAll('game');
  },

  setupController: function (controller, model) {
    controller.set('games', model);
  }

});

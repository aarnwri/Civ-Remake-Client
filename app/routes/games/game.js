import Ember from 'ember';

export default Ember.Route.extend({

  model: function (params) {
    console.log('model hook params: ' + params);
    console.log('id: ' + params.game_id);
    return this.store.findRecord('game', params.game_id);
  },

  setupController: function (controller, model) {
    controller.set('game', model);
  }
});

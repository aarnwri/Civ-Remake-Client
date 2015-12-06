import Ember from 'ember';

export default Ember.Route.extend({

  model: function (params) {
    console.log('model hook params: ' + params);
    console.log('id: ' + params.game_id);
    return this.store.findRecord('game', params.game_id);
  },

  afterModel: function (game, transition) {
    if (!game.get('started')) {
      this.transitionTo('games.game.setup', game);
    }
  },

  setupController: function (controller, model) {
    controller.set('game', model);
  }
});

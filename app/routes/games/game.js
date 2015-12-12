import Ember from 'ember';

export default Ember.Route.extend({

  model: function (params) {
    return this.store.findRecord('game', params.game_id);
  },

  afterModel: function (game) {
    if (game.get('players.length') === 0) {
      game.reload();
    }
  },

  setupController: function (controller, model) {
    controller.set('game', model);

    if (!model.get('started')) {
      this.transitionTo('games.game.setup', model);
    }
  }
});

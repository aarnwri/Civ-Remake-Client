import Ember from 'ember';

export default Ember.Route.extend({

  model: function () {
    return this.store.findAll('game');
  },

  setupController: function (controller, model) {
    controller.set('games', model);
  },

  createGame: function () {
    var game = this.store.createRecord('game');
    game.save().then(
      this.onCreateGameSuccess.bind(this),
      this.onCreateGameFail.bind(game)
    );
  },

  onCreateGameSuccess: function (game) {
    this.transitionTo('games.game', game);
    console.log("game created successfully: " + game);
  },

  onCreateGameFail: function (error) {
    // this bound to game object
    this.removeSelf();
    console.log("saving game failed: err: " + error);
  },

  actions: {
    submitCreateGame: function () {
      this.createGame();
    }
  }

});

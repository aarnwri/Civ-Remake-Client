import Ember from 'ember';

export default Ember.Controller.extend({

  gameController: Ember.inject.controller('games.game'),

  game: Ember.computed.alias('gameController.game'),

  actions: {
    addInviteForm: function () {
      console.log('addInviteForm called');
    }
  }
});

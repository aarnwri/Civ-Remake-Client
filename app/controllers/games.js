import Ember from 'ember';

export default Ember.Controller.extend({

  games: '',

  actions: {
    joinGame: function () {
      // TODO: I think we need a form to fill out... maybe a join game controller...

      this.transitionToRoute('games.join');
    }
  }
});

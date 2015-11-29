import Ember from 'ember';
import ModalForm from '../mixins/modal-form';

export default Ember.Controller.extend(ModalForm, {

  newGameName: '',  // used for the create-game modal

  actions: {
    createGame: function () {
      this.setupModal('Create Game', 'partials/modal-bodies/create-game', 'Save', 'saveGame', true);
    },

    // called by the create-game modal
    saveGame: function () {
      console.log('saveGame called');
      // TODO: process any validations in completing this form... name should be less than 50 chars

      var controller = this;

      var game = this.store.createRecord('game', { name: this.get('newGameName') });
      game.save().then(function (game) {
        // success callback
        console.log("game created successfully: " + game);

      }, function (err) {
        // failure callback
        console.log("error creating game: err: " + err);

      }).finally(function () {
        controller.set('newGameName', '');
      });
    }
  }
});

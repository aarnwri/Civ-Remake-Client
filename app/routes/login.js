import Ember from 'ember';

export default Ember.Route.extend({

  // This keeps the login screen from actually showing up if the user never logged out and checked "remember me"
  beforeModel: function () {
    var route = this;
    var sessionController = this.controllerFor('session');
    var user = sessionController.getRememberedUser();

    if (user && user.email) {
      return new Ember.RSVP.Promise(function (resolve) {
        sessionController.login(user, function () {
          // successCallback
          route.transitionTo('games');
        }, null, function () {
          // finallyCallback
          resolve(true);
        });
      });
    }
  },

  actions: {
    willTransition: function () {
      this.controller.clearFields();
    }
  }
});

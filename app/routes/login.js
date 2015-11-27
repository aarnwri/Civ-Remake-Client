import Ember from 'ember';

export default Ember.Route.extend({

  // This keeps the login screen from actually showing up if the user checked the rememberMe box
  beforeModel: function () {
    var route = this;

    var user = this.controllerFor('application').getRememberedUser();
    if (user && user.email) {
      return new Ember.RSVP.Promise(function (resolve) {
        route.store.adapterFor('application').updateHeadersWithEmailPassword(user.email, user.password);

        var session = route.store.createRecord('session');
        session.save().then(function (session) {
          // success callback

          route.store.adapterFor('application').updateHeadersWithToken(session.get('token'));
          route.controllerFor('application').set('userLoggedIn', true);
          route.transitionTo('games');
        }, function (err) {
          // failure callback

          session.removeSelf();
          console.log("saving session failed: err: " + err);
        }).finally(function () {
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

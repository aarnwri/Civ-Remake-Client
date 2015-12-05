import Ember from 'ember';

export default Ember.Route.extend({

  login: function () {
    var adapter = this.store.adapterFor('application');

    var email = this.controller.get('email');
    var password = this.controller.get('password');

    adapter.updateHeadersWithEmailPassword(email, password);

    var session = this.store.createRecord('session');
    session.save().then(
      this.onLoginSuccess.bind(this),
      this.onLoginFail.bind(session)
    ).finally(
      this.onLoginFinally.bind(this)
    );
  },

  onLoginSuccess: function (session) {
    var adapter = this.store.adapterFor('application');
    var sessionController = this.controllerFor('session');

    var rememberMe = this.controller.get('rememberMe');
    var token = session.get('token');

    adapter.updateHeadersWithToken(token);
    sessionController.setLocalToken(rememberMe ? token : null);

    this.transitionTo('games');
  },

  onLoginFail: function (error) {
    // this bound to session object
    this.removeSelf();
    console.log("saving session failed: err: " + error);
  },

  onLoginFinally: function () {
    this.controller.clearFields();
  },

  actions: {
    submitLoginForm: function () {
      if (this.controller.hasValidFormData()) {
        this.login();
      } else {
        // TODO: still need to find a nice way of validating form data...
      }
    }
  }
});

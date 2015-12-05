import Ember from 'ember';

export default Ember.Route.extend({

  signUp: function () {
    var adapter = this.store.adapterFor('application');

    var email = this.controller.get('email');
    var password = this.controller.get('password');

    adapter.updateHeadersWithEmailPassword(email, password);

    var user = this.store.createRecord('user');
    user.save().then(
      this.onSignUpSuccess.bind(this),
      this.onSignUpFail.bind(user)
    ).finally(
      this.onSignUpFinally.bind(this)
    );
  },

  onSignUpSuccess: function (user) {
    var adapter = this.store.adapterFor('application');
    var sessionController = this.controllerFor('session');

    var rememberMe = this.controller.get('rememberMe');

    var session = user.get('session');
    var token = user.get('session.token');

    adapter.updateHeadersWithToken(token);
    sessionController.saveSessionLocally(rememberMe ? session : null);

    this.transitionTo('games');
  },

  onSignUpFail: function (error) {
    // this bound to user object
    this.removeSelf();
    console.log("saving user failed: error: " + error);
  },

  onSignUpFinally: function () {
    this.controller.clearFields();
  },

  actions: {
    submitSignUpForm: function () {
      if (this.controller.hasValidFormData()) {
        this.signUp();
      } else {
        // TODO: still need to find a nice way of validating form data...
      }
    }
  }
});

import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],

  email: '',
  password: '',
  // rememberMe: false,

  // setRememberMe: function () {
  //   if (this.get('rememberMe')) {
  //     var user = {
  //       email: this.get('email'),
  //       password: this.get('password')
  //     };
  //
  //     this.globals.setRememberedUser(user);
  //   }
  // },

  onSessionSaveSuccess: function (session) {
    // var controller = this;

    // this.setRememberMe();
    this.clearFields();
    this.updateHeaders(session.get('token'));

    // this.get('controllers.application').updateUserLoggedIn();
    this.transitionToRoute('games');
  },

  // resetAllData: function () {
  //   var app = controller.container.lookup('application:main');
  //   app.reset();
  // },

  actions: {
    login: function () {
      var controller = this;

      if (!this.credentialFormatValid()) {
        return;
      }
      this.updateHeaders();

      var session = this.store.createRecord('session', {});
      session.save().then(function (session) {
        // success callback
        controller.onSessionSaveSuccess(session);
      }, function (err) {
        // failure callback
        controller.set('password', '');
        session.removeSelf();
        console.log("saving session failed: err: " + err);
      });
    }
  },

  /////////////////////////////////////////////////////////////////////
  /// helpers
  /////////////////////////////////////////////////////////////////////

  clearFields: function () {
    this.set('email', '');
    this.set('password', '');
    // this.set('rememberMe', false);
  },

  credentialFormatValid: function () {
    // TODO: check credentials for valid format, password long enough...

    this.set('validCredentials', true); // TODO: don't hard code this

    if (!this.get('validCredentials')) {
      alert("those credentials aren't valid"); // TODO: make this interface nicer
      return false;
    }
    return true;
  },

  updateHeaders: function (token) {
    if (token) {
      this.store.adapterFor('application').updateHeadersWithToken(token);
    } else {
      this.store.adapterFor('application').updateHeadersWithEmailPassword(
        this.get('email'),
        this.get('password')
      );
    }
  },
});

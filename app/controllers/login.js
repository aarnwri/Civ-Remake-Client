import Ember from 'ember';

export default Ember.Controller.extend({
  applicationController: Ember.inject.controller('application'),

  email: '',
  password: '',
  rememberMe: false,

  handleRememberMeField: function () {
    console.log('hRMF called');
    console.log('rememberMe: ' + this.get('rememberMe'));
    if (this.get('rememberMe')) {
      this.get('applicationController').setRememberedUser({
        email: this.get('email'),
        password: this.get('password')
      });
    }
  },

  login: function (email, password) {
    var controller = this;

    this.store.adapterFor('application').updateHeadersWithEmailPassword(email, password);

    var session = this.store.createRecord('session');
    session.save().then(function (session) {
      // success callback

      controller.handleRememberMeField();

      controller.store.adapterFor('application').updateHeadersWithToken(session.get('token'));
      controller.get('applicationController').set('userLoggedIn', true);
      controller.transitionToRoute('games');
    }, function (err) {
      // failure callback

      session.removeSelf();
      console.log("saving session failed: err: " + err);
    }).finally(function () {
      controller.clearFields();
    });
  },

  actions: {
    submitLoginForm: function () {
      if (this.validFormData()) {
        this.login(this.get('email'), this.get('password'));
      }
    }
  },

  /////////////////////////////////////////////////////////////////////
  /// helpers
  /////////////////////////////////////////////////////////////////////

  clearFields: function () {
    this.set('email', '');
    this.set('password', '');
    this.set('rememberMe', false);
  },

  validFormData: function () {
    // TODO: check credentials for valid format, password long enough...

    var validForm = true;

    // TODO: add some validations here
    // if !email_formatted_properly then validForm = false, etc...

    // TODO: make some nice JS error messages for when it's not valid
    return validForm;
  },
});

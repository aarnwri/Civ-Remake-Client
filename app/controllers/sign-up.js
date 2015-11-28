import Ember from 'ember';

export default Ember.Controller.extend({
  applicationController: Ember.inject.controller('application'),

  email: '',
  password: '',
  passwordConfirmation: '',
  rememberMe: false,

  handleRememberMeField: function () {
    if (this.get('rememberMe')) {
      this.get('applicationController').setRememberedUser({
        email: this.get('email'),
        password: this.get('password')
      });
    }
  },

  signup: function (email, password) {
    var controller = this;

    this.store.adapterFor('application').updateHeadersWithEmailPassword(email, password);

    var user = this.store.createRecord('user');
    user.save().then(function (user) {
      // success callback

      controller.handleRememberMeField();

      controller.store.adapterFor('application').updateHeadersWithToken(user.get('session.token'));
      controller.get('applicationController').set('userLoggedIn', true);
      controller.transitionToRoute('games');
    }, function (err) {
      // failure callback

      user.removeSelf();
      console.log("saving user failed: err: " + err);
    }).finally(function () {
      controller.clearFields();
    });
  },

  actions: {
    submitSignUpForm: function () {
      if (this.validFormData()) {
        this.signup(this.get('email'), this.get('password'));
      }
    }
  },

  /////////////////////////////////////////////////////////////////////
  /// helpers
  /////////////////////////////////////////////////////////////////////

  clearFields: function () {
    this.set('email', '');
    this.set('password', '');
    this.set('passwordConfirmation', '');
    this.set('rememberMe', false);
  },

  validFormData: function () {
    // TODO: check credentials for valid format, password long enough, matching conf...

    var validForm = true;

    // TODO: add some validations here
    // if !email_formatted_properly then validForm = false, etc...

    // TODO: make some nice JS error messages for when it's not valid
    return validForm;
  },
});

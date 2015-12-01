import Ember from 'ember';

export default Ember.Controller.extend({
  sessionController: Ember.inject.controller('session'),

  email: '',
  password: '',
  passwordConfirmation: '',
  rememberMe: false,

  actions: {
    submitSignUpForm: function () {
      var controller = this;
      var userAttrs = {
        'email': this.get('email'),
        'password': this.get('password'),
        'rememberMe': this.get('rememberMe')
      };

      if (this.validFormData()) {
        this.get('sessionController').signUp(userAttrs, function () {
          // successCallback
          controller.transitionToRoute('games');
        }, function () {
          // failCallback
        }, function () {
          // finallyCallback
          controller.clearFields();
        });
      } else {
        // TODO: still need to find a nice way of validating form data...
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

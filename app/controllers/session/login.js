import Ember from 'ember';

export default Ember.Controller.extend({

  email: '',
  password: '',
  rememberMe: false,

  clearFields: function () {
    this.set('email', '');
    this.set('password', '');
    this.set('rememberMe', false);
  },

  hasValidFormData: function () {
    // TODO: check credentials for valid format, password long enough...

    var validForm = true;

    // TODO: add some validations here
    // if !email_formatted_properly then validForm = false, etc...

    // TODO: make some nice JS error messages for when it's not valid
    return validForm;
  }
});

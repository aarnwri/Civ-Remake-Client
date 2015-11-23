import Ember from 'ember';

export default Ember.Controller.extend({

  ////////////////////////////////////////////////////////////////////////
  /// authentication
  ////////////////////////////////////////////////////////////////////////

  userLoggedIn: false,
  currentUser: null,

  setRememberedUser: function (user) {
    // user should be a plain object
    if (user) {
      localStorage.setItem('rememberedUserEmail', user.email);
      localStorage.setItem('rememberedUserPassword', user.password);
    } else {
      localStorage.setItem('rememberedUserEmail', '');
      localStorage.setItem('rememberedUserPassword', '');
    }
  },
  
  getRememberedUser: function () {
    var rememberedUser = {
      email: localStorage.getItem('rememberedUserEmail'),
      password: localStorage.getItem('rememberedUserPassword')
    };
    return rememberedUser;
  },

  ////////////////////////////////////////////////////////////////////////
  /// template helpers
  ////////////////////////////////////////////////////////////////////////

  isLoginPage: function () {
    return this.get('currentPath') === "login";
  }.property('currentPath'),

  isSignUpPage: function () {
    return this.get('currentPath') === "sign-up";
  }.property('currentPath'),

  isLogoutPage: function () {
    return this.get('currentPath') === "logout";
  }.property('currentPath'),

  authActionName: function () {
    if (this.get('isLoginPage')) {
      return "Sign Up";
    } else if (this.get('isSignUpPage') || this.get('isLogoutPage')) {
      return "Login";
    } else {
      return "Logout";
    }
  }.property('currentPath'),

  actions: {
    triggerAuthAction: function () {
      if (this.get('isLoginPage')) {
        this.transitionToRoute('sign-up');
      } else if (this.get('isSignUpPage') || this.get('isLogoutPage')) {
        this.transitionToRoute('login');
      } else {
        this.transitionToRoute('logout');
      }
    }
  }
});

import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({

  userLoggedIn: false,
  currentUser: null,

  ////////////////////////////////////////////////////////////////////////
  /// localStorage helpers
  ////////////////////////////////////////////////////////////////////////

  setRememberedUser: function (user) {
    // user argument should be a plain object
    localStorage.setItem('rememberedUserEmail', (user && user.email) ? user.email : '');
    localStorage.setItem('rememberedUserPassword', (user && user.password) ? user.password : '');
  },

  getRememberedUser: function () {
    var rememberedUser = {
      email: localStorage.getItem('rememberedUserEmail'),
      password: localStorage.getItem('rememberedUserPassword')
    };
    return rememberedUser;
  },

  ////////////////////////////////////////////////////////////////////////
  /// data helpers
  ////////////////////////////////////////////////////////////////////////

  removeAllData: function () {
    var controller = this;

    var modelPaths = Object.keys(require.entries).filter(function(module) {
      return module.indexOf(config.modulePrefix + '/models/') === 0;
    });

    var models = modelPaths.map(function (path) {
      return path.split('/').get('lastObject');
    }).reject(function (model) {
      return model === "base";
    });

    models.forEach(function (model) {
      controller.removeAllRecordsOfType(model);
    });
  },

  removeAllRecordsOfType: function (type) {
    this.store.peekAll(type).forEach(function (model) {
      model.removeSelf();
    });
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

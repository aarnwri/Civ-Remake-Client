import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
  sessionController: Ember.inject.controller('session'),

  currentUser: Ember.computed.alias('sessionController.currentSession.user'),
  // currentUser: function () {
  //
  // }.property('sessionController.session')

  userLoggedIn: Ember.computed.bool('currentUser'),
  // userLoggedIn: function () {
  //   return this.get('currentUser') ? true : false;
  // }.property('currentUser'),

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
        console.log('currentUser: ' + this.get('currentUser'));
        console.log('userLoggedIn: ' + this.get('userLoggedIn'));
        this.transitionToRoute('login');
      } else {
        console.log('currentUser: ' + this.get('currentUser'));
        console.log('userLoggedIn: ' + this.get('userLoggedIn'));
        this.transitionToRoute('logout');
      }
    }
  }
});

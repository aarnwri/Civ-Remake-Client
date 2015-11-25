import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({

  ////////////////////////////////////////////////////////////////////////
  /// authentication
  ////////////////////////////////////////////////////////////////////////

  userLoggedIn: false,
  currentUser: null,

  logout: function () {
    var controller = this;
    var session = this.store.peekAll('session').get('firstObject');

    session.destroyRecord().then(function () {
      // session.delete success callback

    }, function () {
      // session.delete failure callback
    }).finally(function () {
      // even if logging out fails, we want to remove all the local data in case
      // another user wants to login on the same machine

      controller.removeAllData();
      controller.set('userLoggedIn', false);
      controller.store.adapterFor('application').removeAuthHeader();
      controller.transitionToRoute('logout');
    });
  },

  // setRememberedUser: function (user) {
  //   // user should be a plain object
  //   if (user) {
  //     localStorage.setItem('rememberedUserEmail', user.email);
  //     localStorage.setItem('rememberedUserPassword', user.password);
  //   } else {
  //     localStorage.setItem('rememberedUserEmail', '');
  //     localStorage.setItem('rememberedUserPassword', '');
  //   }
  // },

  // getRememberedUser: function () {
  //   var rememberedUser = {
  //     email: localStorage.getItem('rememberedUserEmail'),
  //     password: localStorage.getItem('rememberedUserPassword')
  //   };
  //   return rememberedUser;
  // },

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
        this.logout();
        this.transitionToRoute('logout');
      }
    }
  }
});

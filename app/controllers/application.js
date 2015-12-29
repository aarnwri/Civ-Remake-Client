import Ember from 'ember';
import config from '../config/environment';
import ModalMixin from 'civ-remake-client/mixins/modal';

export default Ember.Controller.extend( ModalMixin, {

  sessionController: Ember.inject.controller('session'),

  currentUser: Ember.computed.alias('sessionController.currentSession.user'),
  userLoggedIn: Ember.computed.bool('currentUser'),

  isLoginPage: Ember.computed.equal('currentPath', 'session.login'),
  isSignUpPage: Ember.computed.equal('currentPath', 'session.sign-up'),
  isLogoutPage: Ember.computed.equal('currentPath', 'session.logout'),

  authActionName: function () {
    if (this.get('userLoggedIn')) {
      return 'Logout';
    } else {
      if (this.get('isSignUpPage') || this.get('isLogoutPage')) {
        return 'Login';
      } else {
        return 'Sign Up';
      }
    }
  }.property('currentPath', 'userLoggedIn'),

  removeAllRecordsOfType: function (type) {
    this.store.peekAll(type).forEach(function (model) {
      model.removeSelf();
    });
  },

  // NOTE: this is not being used since now there is a function called unloadAll
  // I want to keep this in here in the case that for any reason unloadAll doesn't work
  // for inFlight records...
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

  actions: {
    triggerAuthAction: function () {
      switch(this.get('authActionName')) {
        case 'Login':
          this.transitionToRoute('session.login');
          break;
        case 'Logout':
          this.transitionToRoute('session.logout');
          break;
        case 'Sign Up':
          this.transitionToRoute('session.sign-up');
          break;
      }
    }
  }
});

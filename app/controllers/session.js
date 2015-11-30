import Ember from 'ember';

export default Ember.Controller.extend({
  applicationController: Ember.inject.controller('application'),

  sessions: function () {
    return this.store.peekAll('session');
  }.property(),

  currentSession: function () {
    return this.store.peekAll('session').get('firstObject');
  }.property('sessions.[]'),

  login: function (userAttrs, successCallback = null, failCallback = null, finallyCallback = null) {
    var controller = this;
    var adapter = this.store.adapterFor('application');
    var email = userAttrs.email;
    var password = userAttrs.password;
    var rememberMe = userAttrs.rememberMe;

    adapter.updateHeadersWithEmailPassword(email, password);

    var session = this.store.createRecord('session');
    session.save().then(function (session) {
      // success callback
      adapter.updateHeadersWithToken(session.get('token'));
      controller.set('currentSession', session);

      if (rememberMe) {
        controller.setRememberedUser(email, password);
      } else {
        controller.setRememberedUser('', '');
      }

      if (successCallback) {
        successCallback(session);
      }
    }, function (err) {
      // failure callback

      session.removeSelf();
      console.log("saving session failed: err: " + err);

      if (failCallback) {
        failCallback();
      }
    }).finally(function () {
      if (finallyCallback) {
        finallyCallback();
      }
    });
  },

  logout: function (successCallback = null, failCallback = null, finallyCallback = null, resolve = null) {
    var controller = this;
    var applicationController = this.get('applicationController');
    var adapter = this.store.adapterFor('application');
    var session = this.get('session');

    if (session) {
      session.destroyRecord().then(function () {
        // successCallback

        if (successCallback) {
          successCallback();
        }
      }, function () {
        // failCallback

        if (failCallback) {
          failCallback();
        }
      }).finally(function () {
        // finallyCallback

        // even if logging out fails, we want to remove all the local data in case
        // another user wants to login on the same machine
        applicationController.removeAllData();

        controller.setRememberedUser('', '');
        adapter.removeAuthHeader();

        if (finallyCallback) {
          finallyCallback();
        }
      });
    } else {
      // this shouldn't happen under normal circumstances

      // even if logging out fails, we want to remove all the local data in case
      // another user wants to login on the same machine
      applicationController.removeAllData();

      controller.setRememberedUser('', '');
      adapter.removeAuthHeader();

      resolve(true);
    }
  },

  setRememberedUser: function (email, password) {
    localStorage.setItem('rememberedUserEmail', email);
    localStorage.setItem('rememberedUserPassword', password);
  },

  getRememberedUser: function () {
    var rememberedUser = {
      email: localStorage.getItem('rememberedUserEmail'),
      password: localStorage.getItem('rememberedUserPassword')
    };
    return rememberedUser;
  },
});

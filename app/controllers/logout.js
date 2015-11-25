import Ember from 'ember';

export default Ember.Controller.extend({
  applicationController: Ember.inject.controller('application'),

  logout: function () {
    var controller = this;
    var session = this.store.peekAll('session').get('firstObject');

    console.log("controller: " + controller);
    console.log("session: " + session);

    session.destroyRecord().then(function () {
      // session.delete success callback

    }, function () {
      // session.delete failure callback

    }).finally(function () {
      // even if logging out fails, we want to remove all the local data in case
      // another user wants to login on the same machine

      controller.get('applicationController').removeAllData();
      controller.get('applicationController').set('userLoggedIn', false);
      controller.store.adapterFor('application').removeAuthHeader();
    });
  },
});

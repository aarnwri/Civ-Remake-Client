import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function () {
    var route = this;

    var session = this.store.peekAll('session').get('firstObject');
    if (session) {
      return new Ember.RSVP.Promise(function (resolve) {
        session.destroyRecord().then(function () {
          // session.delete success callback

        }, function () {
          // session.delete failure callback

        }).finally(function () {
          // even if logging out fails, we want to remove all the local data in case
          // another user wants to login on the same machine

          route.controllerFor('application').removeAllData();
          route.controllerFor('application').set('userLoggedIn', false);
          route.store.adapterFor('application').removeAuthHeader();
          resolve(true);
        });
      });
    } else {
      // NOTE: this shouldn't happen under normal circumstances...

      this.controllerFor('application').set('userLoggedIn', false);
      this.controllerFor('application').removeAllData();
      this.store.adapterFor('application').removeAuthHeader();
    }
  }
});

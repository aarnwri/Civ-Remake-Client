import Ember from 'ember';

export default Ember.Route.extend({

  resolve: '',

  beforeModel: function () {
    var route = this;

    return new Ember.RSVP.Promise(function (resolve) {
      route.set('resolve', resolve);
      route.logout();
    });
  },

  // NOTE: we don't really need success or fail callbacks here...
  logout: function () {
    var sessioncontroller = this.controllerFor('session');
    var session = sessioncontroller.get('currentSession');

    session.destroyRecord().then(
      null,
      null
    ).finally(
      this.onLogoutFinally.bind(this)
    );
  },

  onLogoutFinally: function () {
    var sessionController = this.controllerFor('session');
    var adapter = this.store.adapterFor('application');

    adapter.removeAuthHeader();
    sessionController.saveSessionLocally(null);

    this.store.unloadAll();
    this.get('resolve')();
  }
});

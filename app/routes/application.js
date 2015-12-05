import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function () {
    var route = this;
    var sessionController = this.controllerFor('session');
    var session = sessionController.getSessionLocally();

    if (session) {
      var adapter = this.store.adapterFor('application');
      adapter.updateHeadersWithToken(session.token);

      // TODO: retrieve the session and user here so that they are in the store
      // We need an additional action on the api to finish this
      return new Ember.RSVP.Promise(function (resolve) {
        route.store.findRecord('session', session.id).then(
          function () {
            // success callback

            resolve(true);
          },
          function (error) {
            // fail callback

            console.log('error: ' + error);
            route.transitionTo('session.login');
            resolve(true);
          }
        );
      });
    } else {
      this.transitionTo('session.login');
    }
  }
});

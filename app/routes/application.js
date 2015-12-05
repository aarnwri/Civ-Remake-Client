import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function () {
    var sessionController = this.controllerFor('session');
    var token = sessionController.getLocalToken();

    if (token) {
      console.log('token equated to true');
      var adapter = this.store.adapterFor('application');
      adapter.updateHeadersWithToken(token);

      // TODO: retrieve the session and user here so that they are in the store
      // We need an additional action on the api to finish this
    } else {
      this.transitionTo('session.login');
    }
  }
});

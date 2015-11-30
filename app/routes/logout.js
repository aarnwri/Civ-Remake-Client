import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function () {
    var sessionController = this.controllerFor('session');

    return new Ember.RSVP.Promise(function (resolve) {
      sessionController.logout(null, null, function () {
        resolve(true);
      }, resolve);
    });
  }
});

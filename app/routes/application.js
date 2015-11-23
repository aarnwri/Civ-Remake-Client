import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function (controller) {
    console.log('setting up applicationController');

    //TODO: check for a remembered user here and login automatically if remembered

  }
});

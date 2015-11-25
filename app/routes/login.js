import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function (transition) {
    console.log("beforeModel called");
    var route = this;
    var user = this.controllerFor('application').getRememberedUser();
    if (user && user.email) {
      
      // this.store.adapterFor('application').updateHeadersWithEmailPassword(user.email, user.password);
      //
      // var session = this.store.createRecord('session');
      // session.save().then(function (session) {
      //   // success callback
      //
      //   route.store.adapterFor('application').updateHeadersWithToken(session.get('token'));
      //   route.controllerFor('application').set('userLoggedIn', true);
      //   route.transitionTo('games');
      // }, function (err) {
      //   // failure callback
      //
      //   session.removeSelf();
      //   console.log("saving session failed: err: " + err);
      // });
    }




  }
  // setupController: function (controller) {
  //   console.log('setting up loginController');
  //
  //   var user = this.controllerFor('application').getRememberedUser();
  //   if (user && user.email) {
  //     controller.login(user.email, user.password, 'games');
  //     return;
  //   }
  // }
});

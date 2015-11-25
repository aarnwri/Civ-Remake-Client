import Ember from 'ember';

export default Ember.Route.extend({
  activate: function () {
    console.log('activate triggered');
  },
  beforeModel: function (transition) {
    this.transitionTo('login');
    // this.transitionTo('games');
    console.log("this still gets ran");
    // this.transitionTo('games');
    // console.log("applicationController: " + this.controllerFor('application'));
    // var controller = this.controllerFor('application');
    // var user = controller.getRememberedUser();
    // console.log("user: " + user);
    // console.log('user.email: ' + user.email);
    // console.log('user.password: ' + user.password);
    // if (user && user.email) {
    //   var loginController = this.controllerFor('login');
    //
    //   console.log("loginController: " + loginController);
    //   // loginController.set('email', user.email);
    //   // loginController.set('password', user.password);
    //   // loginController.set('rememberMe', true);
    //
    //   loginController.login(user.email, user.password);
    //   this.transitionTo('games');
    // }
  },

  // setupController: function (controller) {
  //   console.log('setting up applicationController');
  //
  //   var user = controller.getRememberedUser();
  //   console.log("user: " + user);
  //   console.log('user.email: ' + user.email);
  //   console.log('user.password: ' + user.password);
  //   if (user && user.email) {
  //     var loginController = this.controllerFor('login');
  //
  //     console.log("loginController: " + loginController);
  //     // loginController.set('email', user.email);
  //     // loginController.set('password', user.password);
  //     // loginController.set('rememberMe', true);
  //
  //     loginController.login(user.email, user.password);
  //     this.transitionTo('games');
  //   }
  // }
});

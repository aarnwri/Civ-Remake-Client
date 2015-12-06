import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('session', function() {
    this.route('login');
    this.route('logout');
    this.route('sign-up');
  });

  this.route('games', function() {
    this.route('game', { path: '/:game_id'}, function() {
      this.route('setup');
    });
    this.route('join');
  });
});

export default Router;

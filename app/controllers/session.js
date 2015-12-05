import Ember from 'ember';

export default Ember.Controller.extend({

  sessions: function () {
    return this.store.peekAll('session');
  }.property(),

  currentSession: Ember.computed.alias('sessions.firstObject'),

  setLocalToken: function (token = null) {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  },

  getLocalToken: function () {
    return localStorage.getItem('token');
  }
});

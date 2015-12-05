import Ember from 'ember';

export default Ember.Controller.extend({

  sessions: function () {
    return this.store.peekAll('session');
  }.property(),

  currentSession: Ember.computed.alias('sessions.firstObject'),

  saveSessionLocally: function (session = null) {
    if (session) {
      localStorage.setItem('sessionToken', session.get('token'));
      localStorage.setItem('sessionId', session.get('id'));
    } else {
      localStorage.removeItem('sessionToken');
      localStorage.removeItem('sessionId');
    }
  },

  getSessionLocally: function () {
    var token = localStorage.getItem('sessionToken');
    var id = localStorage.getItem('sessionId');

    if (token && id) {
      return {
        'token': token,
        'id': id
      };
    } else {
      return null;
    }
  }
});

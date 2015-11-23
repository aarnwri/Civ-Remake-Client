import Ember from 'ember';
import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  host: "http://localhost:3000/api/v1",

  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },

  updateHeadersWithEmailPassword: function (email, password) {
    this.set('headers', Ember.$.extend({}, this.get('headers'), {
      'Authorization': 'Basic ' + btoa(email + ':' + password)
    }));
  },

  updateHeadersWithToken: function (token) {
    this.set('headers', Ember.$.extend({}, this.get('headers'), {
      'Authorization': 'Token token=' + token
    }));
  }
});

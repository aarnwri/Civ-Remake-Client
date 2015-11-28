import Ember from 'ember';
import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  host: "http://localhost:3000/api/v1",

  headers: function () {
    return this.get('defaultHeaders');
  }.property(),

  defaultHeaders: {
    'Accept': 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json'
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
  },

  removeAuthHeader: function () {
    this.set('headers', this.get('defaultHeaders'));
  }
});

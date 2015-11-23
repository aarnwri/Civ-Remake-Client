import Ember from 'ember';
import DS from 'ember-data';

// TODO: think about using the JSONAPIAdapter here... must adhere to these conventions: http://jsonapi.org/
// export default DS.JSONAPIAdapter.extend({
export default DS.RESTAdapter.extend({
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

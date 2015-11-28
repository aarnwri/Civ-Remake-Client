import DS from 'ember-data';
import Ember from 'ember';

export default DS.JSONAPISerializer.extend({

  // // NOTE: I don't think this is being used yet... might not need it...
  // keyForAttribute: function(attr, method) {
  //   return Ember.String.underscore(attr);
  // },
  //
  // // NOTE: I don't think this is being used yet... might not need it...
  // normalize: function (modelClass, resourceHash, prop) {
  //   console.log("modelClass: " + modelClass);
  //   console.log('resourceHash: ' + resourceHash);
  //   console.log('prop' + prop);
  // },
});

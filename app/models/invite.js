import DS from 'ember-data';

export default DS.Model.extend({
  // NOTE: email should only be used for the form, after it's saved it should
  // reference the user instead.
  email: DS.attr('email'),

  received: DS.attr('boolean'),
  accepted: DS.attr('boolean'),
  rejected: DS.attr('boolean'),

  user: DS.belongsTo('user'),
  game: DS.belongsTo('game'),

  sent: function () {
    return this.get('id') !== null;
  }.property('id')
});

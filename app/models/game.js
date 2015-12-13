import DS from 'ember-data';
import Base from '../models/base';

export default Base.extend({
  name: DS.attr('string'),
  started: DS.attr('boolean'),

  creator: DS.belongsTo('user'),
  players: DS.hasMany('player'),
  invites: DS.hasMany('invite')
});

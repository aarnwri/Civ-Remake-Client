import Base from '../models/base';
import DS from 'ember-data';

export default Base.extend({
  user: DS.belongsTo('user'),

  token: DS.attr('string')
});

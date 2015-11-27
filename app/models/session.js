import Base from '../models/base';
import DS from 'ember-data';

export default Base.extend({
  token: DS.attr('string'),

  user: DS.belongsTo('user', { async: false })
});

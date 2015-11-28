import DS from 'ember-data';
import Base from '../models/base';

export default Base.extend({
  token: DS.attr('string'),

  user: DS.belongsTo('user', { async: false })
});

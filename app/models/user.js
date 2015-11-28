import DS from 'ember-data';
import Base from '../models/base';

export default Base.extend({
  email: DS.attr('string'),

  session: DS.belongsTo('session', {async: false})
});

import Base from '../models/base';
import DS from 'ember-data';

export default Base.extend({
  email: DS.attr('string'),

  session: DS.belongsTo('session', {async: false})
});

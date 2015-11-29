import DS from 'ember-data';
import Base from '../models/base';

export default Base.extend({
  user: DS.belongsTo('user'),
  game: DS.belongsTo('game')
});

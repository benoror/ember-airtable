import DS from 'ember-data';

export default DS.Model.extend({
  created: DS.attr('date'),
  name: DS.attr('string'),
  description: DS.attr('string')
});

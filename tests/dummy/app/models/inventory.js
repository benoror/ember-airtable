import DS from 'ember-data';

export default DS.Model.extend({
  product: DS.attr('string'), // ToDo: Refactor to belongsTo
  qty: DS.attr('number'),
  restockAt: DS.attr('number')
  // ToDo: needsRestocking: computed qty <= restockAt
});

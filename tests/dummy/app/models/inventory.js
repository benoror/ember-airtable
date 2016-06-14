import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  created: DS.attr('date'),
  product: DS.belongsTo('product', { async: true }),
  qty: DS.attr('number'),
  "restock-at": DS.attr('number'),
  needsRestocking: Ember.computed('qty', 'restock-at', function() {
    return this.get('qty') <= this.get('restock-at');
  })
});

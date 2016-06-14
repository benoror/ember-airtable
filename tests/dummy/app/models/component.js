import DS from 'ember-data';

export default DS.Model.extend({
  created: DS.attr('date'),
  name: DS.attr('string'),
  // ToDo: For some reason adding this `belongsTo`
  // prevents rendering in template (products.hbs, each product.components)
  //product: DS.belongsTo('product')
});

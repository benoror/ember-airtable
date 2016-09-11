import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.createRecord('product');
  },

  actions: {
    saveProduct(product) {
      product.save().then((results) => {
        console.log('saved', results);
      }, (error) => {
        console.log('error', error);
      });
    }
  }
});


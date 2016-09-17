import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.createRecord('product');
  },

  actions: {
    saveProduct(product) {
      return product.save().then((results) => {
        return this.transitionTo('products');
      }, (error) => {
        console.log('error', error);
      });
    }
  }
});


import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.createRecord('product');
  },

  setupController(controller/*, model*/) {
    controller.set('components', this.store.findAll('component'));
    this._super(...arguments);
  },

  actions: {
    saveProduct(product) {
      return product.save().then(() => {
        //return this.transitionTo('products');
      }, (error) => {
        console.log('error', error);
      });
    }
  }
});


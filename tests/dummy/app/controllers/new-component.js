import Ember from 'ember';

export default Ember.Controller.extend({
  productId: null,

  actions: {
    setProduct(productId) {
      this.set('productId', productId);
    }
  }
});

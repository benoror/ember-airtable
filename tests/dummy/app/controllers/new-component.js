import Ember from 'ember';

export default Ember.Controller.extend({
  product: null,

  actions: {
    setProduct(productId) {
      this.set('product.id', productId);
    }
  }
});

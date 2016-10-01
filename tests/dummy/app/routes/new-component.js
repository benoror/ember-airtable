import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.createRecord('component');
  },

  setupController(controller/*, model*/) {
    controller.set('products', this.store.findAll('product'));
    this._super(...arguments);
  },

  actions: {
    saveComponent(component, productId) {
      return this.get('store').findRecord('product', productId).then((p) => {
        component.set('product', p);
        return component.save().then(() => {
          return this.transitionTo('products');
        }, (error) => {
          return console.log('error', error);
        });
      });
    }
  }
});



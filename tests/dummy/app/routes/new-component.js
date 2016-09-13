import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.createRecord('component');
  },

  setupController(controller, model) {
    controller.set('products', this.store.findAll('product'));
    this._super(...arguments);
  },

  actions: {
    saveComponent(component, product) {
      component.set('product', product);
      return component.save().then((results) => {
        console.log('saved', results);
        this.transitionTo('products');
      }, (error) => {
        console.log('error', error);
      });
    }
  }
});



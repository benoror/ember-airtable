import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    addComponent(componentId) {
      let component = this.store.peekRecord('component', componentId);
      let product = this.get('model');
      product.get('components').pushObject(component);
    }
  }
});


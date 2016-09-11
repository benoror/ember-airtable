import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('inventories');
  this.route('products');
  this.route('new-product');
});

export default Router;

import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('inventories');
  this.route('products');
  this.route('new-product');
  this.route('new-component');
});

export default Router;

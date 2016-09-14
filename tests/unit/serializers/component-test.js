import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';
import Pretender from 'pretender';

// ToDo: Install ember-cli-faker
import mocks from './mocks';
const { productMock } = mocks;

moduleForModel('component', 'Unit | Serializer | component', {
  needs: ['serializer:application',
          'model:product',
          'model:inventory',
          'model:component'],

  beforeEach() {
    this.mockServer = new Pretender(function() {
      this.post('/components', function() {
        const response = {
          records: [productMock]
        };
        return [200, { "Content-Type": "application/json" }, JSON.stringify(response)];
      });
    });
  },

  afterEach() {
    this.mockServer.shutdown();
  }
});

test('it serializes belongsTo', function(assert) {
  let store = this.store();

  Ember.run(() => {
    let component = store.createRecord('component', {
      name: 'testComponent'
    });
    //let product = store.createRecord('product', {
      //name: 'testProduct'
    //});
    //component.set('product', product);

    component.save().then(() => {
      let [ request ] = this.mockServer.handledRequests;
      let requestPayload = JSON.parse(request.requestBody);
      assert.deepEqual(requestPayload, {
        cats: [
          { name: 'Frisky' }
        ]
      });
    });
  });
});


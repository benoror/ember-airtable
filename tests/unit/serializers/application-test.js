import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';
import Pretender from 'pretender';

// ToDo: Install ember-cli-faker

let mockServer;

const productMock = {
  id: 'product123',
  createdTime: (new Date()).toISOString(),
  fields: {
    name: 'foo',
    description: 'bar'
  }
};

const inventoryMock = {
  id: 'inventory123',
  createdTime: (new Date()).toISOString(),
  fields: {
    product: ['product123'],
    qty: 5,
    'restock-at': 10
  }

};

moduleForModel('product', 'Unit | Serializer | product', {
  needs: ['serializer:application', 'model:product', 'model:inventory'],

  beforeEach() {
    mockServer = new Pretender(function() {
      // this.get('/products', function() {
      //   const response = {
      //     records: [productMock]
      //   };
      //   return [200, { "Content-Type": "application/json" }, JSON.stringify(response)];
      // });

      this.get('/inventories', function() {
        const response = {
          records: [inventoryMock]
        };
        return [200, { "Content-Type": "application/json" }, JSON.stringify(response)];
      });
    });
  },

  afterEach() {
    mockServer.shutdown();
  }
});

test('it serializes records', function(assert) {
  return this.store().findAll('inventory').then((records) => {
    assert.equal(records.get('length'), 1);
    const record = records.objectAt(0);
    assert.ok(record.get('created'));
    assert.equal(record.get('qty'), inventoryMock.fields['qty']);
    assert.equal(record.get('restock-at'), inventoryMock.fields['restock-at']);
  });
});

test('it serializes belongsTo relationship', function(assert) {
  Ember.run(() => {
    this.store().push({
      data: {
        id: productMock.id,
        type: 'product',
        attributes: productMock.fields
      }
    });
  });

  return this.store().findAll('inventory').then((records) => {
    const record = records.objectAt(0);
    assert.equal(record.get('product.name'), productMock.fields.name);
    assert.equal(record.get('product.description'), productMock.fields.description);
  });
});

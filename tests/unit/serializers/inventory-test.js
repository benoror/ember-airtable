import { moduleForModel, test } from 'ember-qunit';
import Pretender from 'pretender';

// ToDo: Install ember-cli-faker

let mockServer;

const productMock = {
  id: 'product123',
  createdTime: (new Date()).toISOString(),
  fields: {
    name: 'foo',
    description: 'bar',
    components: ['componentA', 'componentB']
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

const componentsMock = [
  {
    id: 'componentA',
    createdTime: (new Date()).toISOString(),
    fields: {
      name: 'pieceA',
      product: ['product123']
    }
  },
  {
    id: 'componentB',
    createdTime: (new Date()).toISOString(),
    fields: {
      name: 'pieceB',
      product: ['product123']
    }
  }
];

moduleForModel('inventory', 'Unit | Serializer | inventory', {
  needs: ['serializer:application',
            'model:product',
            'model:inventory',
            'model:component'],

  beforeEach() {
    mockServer = new Pretender(function() {
      this.get('/products', function() {
        const response = {
          records: [productMock]
        };
        return [200, { "Content-Type": "application/json" }, JSON.stringify(response)];
      });

      this.get(`/products/${productMock.id}`, function() {
        return [200, { "Content-Type": "application/json" }, JSON.stringify(productMock)];
      });

      this.get('/inventories', function() {
        const response = {
          records: [inventoryMock]
        };
        return [200, { "Content-Type": "application/json" }, JSON.stringify(response)];
      });

      this.get(`/components/${componentsMock[0].id}`, function() {
        return [200, { "Content-Type": "application/json" }, JSON.stringify(componentsMock[0])];
      });

      this.get(`/components/${componentsMock[1].id}`, function() {
        return [200, { "Content-Type": "application/json" }, JSON.stringify(componentsMock[1])];
      });
    });
  },

  afterEach() {
    mockServer.shutdown();
  }
});

test('it serializes records', function(assert) {
  return this.store().findAll('inventory').then((inventories) => {
    assert.equal(inventories.get('length'), 1);
    const inventory = inventories.objectAt(0);
    assert.ok(inventory.get('created'));
    assert.equal(inventory.get('qty'), inventoryMock.fields['qty']);
    assert.equal(inventory.get('restock-at'), inventoryMock.fields['restock-at']);
  });
});

test('it serializes belongsTo relationship', function(assert) {
  return this.store().findAll('inventory').then((inventories) => {
    const inventory = inventories.objectAt(0);
    inventory.get('product').then((product) => {
      assert.equal(product.get('name'), productMock.fields.name);
      assert.equal(product.get('description'), productMock.fields.description);
    });
  });
});

test('it serializes hasMany relationship', function(assert) {
  return this.store().findAll('product').then((products) => {
    const product = products.objectAt(0);
    product.get('components').then((components) => {
      components.forEach((component, index) => {
        assert.equal(component.get('name'), componentsMock[index].fields.name);
      });
    });
  });
});

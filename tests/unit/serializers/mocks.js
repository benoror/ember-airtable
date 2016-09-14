export const productMock = {
  id: 'product123',
  createdTime: (new Date()).toISOString(),
  fields: {
    name: 'foo',
    description: 'bar',
    components: ['componentA', 'componentB']
  }
};

export const inventoryMock = {
  id: 'inventory123',
  createdTime: (new Date()).toISOString(),
  fields: {
    product: ['product123'],
    qty: 5,
    'restock-at': 10
  }
};

export const componentsMock = [
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



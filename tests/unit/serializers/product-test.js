import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('product', 'Unit | Serializer | product', {
  needs: ['serializer:application',
          'model:product',
          'model:inventory',
          'model:component']

  //beforeEach() {
    //this.mockServer = new Pretender(function() {
      //this.post('/products', function() {
        //const response = {
          //records: [productMock]
        //};
        //return [200, { "Content-Type": "application/json" }, JSON.stringify(response)];
      //});

      //// ToDo: put, delete

    //});
  //},

  //afterEach() {
    //this.mockServer.shutdown();
  //}
});

test('it serializes records', function(assert) {
  let record = this.subject();
  let serializedRecord;

  Ember.run(function(){
    record.set('name', 'testName');
    record.set('formula_ronly', 'testROnly');
    serializedRecord = record.serialize();
    assert.ok(serializedRecord);
    assert.equal(serializedRecord['name'], 'testName');
    assert.equal(serializedRecord['formula_ronly'], undefined);
  });

  //Ember.run(function(){
    //record.save();
  //});

  //Ember.run(function(){
    //let [ request ] = mockServer.handledRequests;
    //let body = request.requestBody;
    //let requestPayload = JSON.parse(body);
    //let expectedJSON = [> JSON <]
      //assert.deepEqual(requestPayload, expectedJSON);
  //});

});

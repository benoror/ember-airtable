import Ember from 'ember';
import DS from 'ember-data';

const inflector = new Ember.Inflector();

export default DS.RESTSerializer.extend({

  normalizeResponse(store, type, payload) {
    const modelNamePlural = inflector.pluralize(type.modelName);

    if(payload.records) {
      payload[modelNamePlural] = payload.records;
      delete payload.records;

      payload.meta = {
        offset: payload.offset
      };
      delete payload.offset;

      payload[modelNamePlural].forEach((record) => {
        Ember.merge(record, record.fields);
        delete record.fields;
        record.created = record.createdTime;
        delete record.createdTime;
      });
    } else {
      payload[type.modelName] = payload.fields;
      payload[type.modelName].id = payload.id;
      payload[type.modelName].created = payload.createdTime;
      delete payload.id;
      delete payload.fields;
      delete payload.createdTime;
    }

    return this._super(...arguments);
  },

  serializeIntoHash: function(data, type, record, options) {
    data['fields'] = this.serialize(record, options);
  },

  serialize: function(snapshot, options) {
    let json = this._super(snapshot, options);

    delete json.created;

    return json;
  },

  serializeBelongsTo: function(snapshot, json, relationship) {
    let key = relationship.key;
    let belongsTo = snapshot.belongsTo(key, { id: true });
    key = this.keyForRelationship
      ? this.keyForRelationship(key, "belongsTo", "serialize") : key;
    json[key] = Ember.isNone(belongsTo) ? [] : [ belongsTo ];
    // overriden from:
    // https://github.com/emberjs/data/blob/v2.7.0/addon/serializers/json.js#L1180
  }

});

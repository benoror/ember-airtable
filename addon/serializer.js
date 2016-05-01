import Ember from 'ember';
import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalizeResponse(store, type, payload) {
    const modelNamePlural = type.modelName + 's'; // ToDo: Fix to pluralize // Ember.String.*

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
  }

  // ToDo: Improve from
  //   https://github.com/201-created/ember-data-hal-9000/blob/master/addon/serializer.js

  // keyForRelationship(key) {
  //   return Ember.String.underscore(key);
  // }

});

import AirtableAdapter from "ember-airtable/adapter";

export default AirtableAdapter.extend({

  // API Version + Base ID
  namespace: 'v0/REPLACE_WITH_YOUR_BASE_ID',

  headers: {
    'Accept': 'application/json',
    // API Token Key
    'Authorization': `Bearer REPLACE_WITH_YOUR_API_KEY`
  }
});

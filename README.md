# ember-airtable

[![NPM](https://nodei.co/npm/ember-airtable.png)](https://npmjs.org/package/ember-airtable)

![Download count all time](https://img.shields.io/npm/dt/ember-airtable.svg) [![Ember Observer Score](https://emberobserver.com/badges/ember-airtable.svg)](https://emberobserver.com/addons/ember-airtable) [![Build Status](https://travis-ci.org/benoror/ember-airtable.svg?branch=master)](https://travis-ci.org/benoror/ember-airtable) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

<table>
  <tr>
    <td>
      <img src="https://cloud.githubusercontent.com/assets/119117/14939460/966c23d0-0f0d-11e6-89b1-59d673ac28ee.png" />
    </td>
    <td>
      <img src="https://cloud.githubusercontent.com/assets/119117/14939463/ad25f15a-0f0d-11e6-9a12-53889f893ccc.png" />
      <h1 align="center"><a href="https://airtable.com">Airtable</a></h1>
    </td>
  </tr>
</table>

Ember addon for [Airtable](https://airtable.com/) APIs

**Dummy app**: https://github.com/benoror/ember-airtable/tree/master/tests/dummy/app

**Medium post**: https://medium.com/@benoror/creating-an-ember-addon-for-airtable-api-d9e38d7bef97#.33q0r7hhm

*Originally based on: https://github.com/benoror/fieldbook-app

# Usage

## Install

```
ember install ember-airtable
```

## Adapter

Use **AirtableAdapter** as you application's main adapter:

##### **`adapters/application.js`**:

```JavaScript
import AirtableAdapter from "ember-airtable/adapter";

export default AirtableAdapter.extend({

  // API Version + Base ID
  namespace: 'v0/app_YOUR_AIRTABLE_BASE_KEY',

  headers: {
    'Accept': 'application/json',
    // API Token
    'Authorization': `Bearer key_YOUR_AIRTABLE_API_KEY`
  }
});

```

## Serializer

Use **AirtableSerializer** as you application's main serializer:

##### **`serializers/application.js`**:

```JavaScript
import AirtableSerializer from "ember-airtable/serializer";

export default AirtableSerializer.extend();

```

## Models

If you want to skip persistance of certain attributes (ex. formula columns) add the `readOnly` option:

##### **`models/product.js`**:

```JavaScript
import DS from 'ember-data';

export default DS.Model.extend({
  formula: DS.attr('string', { readOnly: true })
});

```

# Development

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).

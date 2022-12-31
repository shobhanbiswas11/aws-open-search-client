# simple-aws-opensearch-client

## quick-start

### Installation

via NPM:
```bash
npm install simple-aws-opensearch-client
```

via yarn:
```bash
yarn add simple-aws-opensearch-client
```

via pnpm:
```bash
pnpm add simple-aws-opensearch-client
```


Note: If you don’t already have Node on your machine, [install it first](https://nodejs.org/)

### Getting started

#### Get Client
```js
const {getClient} = require("simple-aws-opensearch-client")

// es-module
import { getClient } from "simple-aws-opensearch-client";

const client = await getClient({
    host: "<domain>", 
    region: "ap-south-1",
    service: "es", // Not required (default : es) 
})

```

#### Create an Index

```javascript
  console.log('Creating index:');

  const index_name = 'books';
  const settings = {
    settings: {
      index: {
        number_of_shards: 4,
        number_of_replicas: 3,
      },
    },
  };

  const response = await client.indices.create({
    index: index_name,
    body: settings,
  });

  console.log(response.body);
```

#### Add a Document to the Index

```javascript
  console.log('Adding document:');

  const document = {
    title: 'The Outsider',
    author: 'Stephen King',
    year: '2018',
    genre: 'Crime fiction',
  };

  const id = '1';

  const response = await client.index({
    id: id,
    index: index_name,
    body: document,
    refresh: true,
  });

  console.log(response.body);
```

#### Search for the Document

```javascript
  console.log('Search results:');

  const query = {
    query: {
      match: {
        title: {
          query: 'The Outsider',
        },
      },
    },
  };

  const response = await client.search({
    index: index_name,
    body: query,
  });

  console.log(response.body.hits);
```

#### Delete the document

```javascript
  console.log('Deleting document:');

  const response = await client.delete({
    index: index_name,
    id: id,
  });

  console.log(response.body);
```

#### Delete the index

```javascript
  console.log('Deleting index:');

  const response = await client.indices.delete({
    index: index_name,
  });

  console.log(response.body);
```




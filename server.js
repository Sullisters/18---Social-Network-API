const express = require('express');
const mongodb = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = 3001;

const connectionStringUI = `mongodb://127.0.0.1:27017/shelterDB`;

let db;

mongodb.connect(
    connectionStringURI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
      db = client.db();
      app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
      });
    }
  );

app.use(express.json());

app.get()

app.post()

app.put()

app.delete()
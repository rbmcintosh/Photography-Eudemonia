var MongoClient = require('mongodb').MongoClient;

const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name

// Use connect method to connect to the server
MongoClient.connect(url, function (err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const dbName = ('photographyEudemonia');
  const db = client.db(dbName);
  const collection = db.collection('images');

  collection.find({}).toArray((err, result) => {
    if (err) throw err;
    console.log(result);
  });

  client.close();

  let docs = {
    {"album": "india",
     "imagesCount":

  }

  insertDocuments(db, function () {
    client.close();
  }, collection, docs);
});

const getDocs = function (collection, callback) {
  return collection.find({},
    function (err, result) {
      console.log("found docs");
      callback(result);
    });
}

const insertDocuments = function (collection, docs, callback) {
  // Get the documents collection
  // Insert some documents
  collection.updateMany(
    docs,
    function (err, result) {
      // assert.equal(err, null);
      // assert.equal(3, result.result.n);
      // assert.equal(3, result.ops.length);
      console.log("Inserted 3 documents into the collection");
      callback(result);
    }
  );
}

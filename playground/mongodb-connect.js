const { MongoClient, ObjectID } = require("mongodb");
// Same as
// const MongoClient = require("mongodb").MongoClient;

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect(
  "mongodb://localhost:27017/TodoApp",
  { useNewUrlParser: true },
  (err, client) => {
    if (err) {
      return console.log("Unable to connect to MongoDB server");
    }
    console.log("Connected to MongoDB server");
    const db = client.db("TodoApp");

    // db.collection("Todo").insertOne(
    //   {
    //     text: "Something to do",
    //     complete: false
    //   },
    //   (err, result) => {
    //     if (err) {
    //       return console.log("Unable to insert todo", err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    //   }
    // );

    // db.collection("Todo")
    //   .find({ _id: new ObjectID("5b625a45d3209b45648b106b") })
    //   .toArray()
    //   .then(
    //     docs => {
    //       console.log("Todos");
    //       console.log(JSON.stringify(docs, undefined, 2));
    //     },
    //     err => {
    //       console.log("Unable to fetch todos", err);
    //     }
    //   );

    db.collection("Todo")
      .find()
      .count()
      .then(
        count => {
          console.log("Todos' count: ", count);
        },
        err => {
          console.log("Unable to count todos", err);
        }
      );

    // client.close();
  }
);

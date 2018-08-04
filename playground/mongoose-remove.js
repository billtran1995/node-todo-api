const { ObjectID } = require("mongodb");

const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require("./../server/models/todo");
const { User } = require("./../server/models/user");

Todo.remove({}).then(todo => {
  console.log(todo);
});

// Todo.findOneAndRemove
// Todo.findByIdAndRemove

Todo.findByIdAndRemove("5b64f47d3ffef264044ddbd1").then(todo => {
  console.log(todo);
});

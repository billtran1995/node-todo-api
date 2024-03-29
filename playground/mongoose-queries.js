const { ObjectID } = require("mongodb");
const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require("./../server/models/todo");

var id = "5b63de6821a53c4d0c3c5080";

if (!ObjectID.isValid(id)) {
  console.log("Id not valid");
}

Todo.find({
  _id: id
}).then(todos => {
  console.log("Todos", todos);
});

Todo.findOne({
  _id: id
}).then(todo => {
  console.log("Todo", todo);
});

Todo.findById(id)
  .then(todo => {
    if (!todo) {
      return console.log("Id not found");
    }
    console.log("Todo", todo);
  })
  .catch(e => {
    console.log(e);
  });

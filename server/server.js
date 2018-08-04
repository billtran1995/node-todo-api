// Library import
const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");

// Local import
var { mongoose } = require("./db/mongoose");
var { Todo } = require("./models/todo");
var { User } = require("./models/user");

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());

// Show todos
app.get("/todos", (req, res) => {
  Todo.find().then(
    todos => {
      res.send({ todos }); // Send obj instead of array, so that we can add anything later on to the message
    },
    e => {
      res.status(400).send(e);
    }
  );
});

// Create todo
app.post("/todos", (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

// Show /todos/:id
app.get("/todos/:id", (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(404).send();
  }

  Todo.findById(req.params.id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({ todo });
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = { app };

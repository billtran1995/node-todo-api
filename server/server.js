// Library import
const express = require("express");
const bodyParser = require("body-parser");

// Local import
var { mongoose } = require("./db/mongoose");
var { Todo } = require("./models/todo");
var { User } = require("./models/user");

const app = express();

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

app.listen(4000, () => {
  console.log("Server started on port 4000");
});

module.exports = { app };

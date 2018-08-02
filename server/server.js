// Library import
const express = require("express");
const bodyParser = require("body-parser");

// Local import
var { mongoose } = require("./db/mongoose");
var { Todo } = require("./models/todo");
var { User } = require("./models/user");

const app = express();

app.use(bodyParser.json());

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

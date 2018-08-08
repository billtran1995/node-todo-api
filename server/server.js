require("./config/config");

// Library import
const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const { ObjectID } = require("mongodb");

// Local import
var { mongoose } = require("./db/mongoose");
// require("./db/mongoose");
var { Todo } = require("./models/todo");
var { User } = require("./models/user");
var { authenticate } = require("./middleware/authenticate");

const app = express();
const port = process.env.PORT;

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

// Delete todo
app.delete("/todos/:id", (req, res) => {
  let id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id)
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

// Update todo
app.patch("/todos/:id", (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ["text", "completed"]);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  // new:true is the same as returnOriginal:false from "mongodb"
  Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }

      res.send({ todo });
    })
    .catch(e => {
      res.status(400).send();
    });
});

// POST /users
app.post("/users", (req, res) => {
  var body = _.pick(req.body, ["email", "password"]);
  var user = new User(body);

  user
    .save()
    .then(() => {
      return user.generateAuthToken();
      // res.send(user);
    })
    .then(token => {
      // When a header is prefix with x, it is a custom header
      // use for specific purposes
      res.header("x-auth", token).send(user);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.get("/users/me", authenticate, (req, res) => {
  res.send(req.user);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = { app };

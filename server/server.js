const mongoose = require("mongoose");

// Mongoose by default use callback
// To use it with promise we need to
// set it up first.
mongoose.Promise = global.Promise; // This will tell mongoose which promise to use
// Here the promise is set to the built-in promise library instead of any third party promise

mongoose.connect(
  "mongodb://localhost:27017/TodoApp",
  { useNewUrlParser: true }
);

/*------------------------------------------------------------------------------------------*/
// Todo model
var Todo = mongoose.model("Todo", {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true //trim all whitespace
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

// Create
// var newTodo = new Todo({
//   text: "Cook dinner"
// });

// var newTodo = new Todo({
//   text: 12
// }); => This will not fail, the 12 will be auto converted to string

// var newTodo = new Todo({
//   text: ""
// });  => This fails because the text's minlength is 1

// var newTodo = new Todo({
//   text: "    "
// }); => This fails because trim will take away all spaces and leave the string empty

// Save todo
// newTodo.save().then(
//     doc => {
//       console.log("Saved todo", doc);
//     },
//     e => {
//       console.log("Unable to save todo", e);
//     }
//   );

/* ----------------------------------------------------------------------------------*/
// User model
var User = mongoose.model("User", {
  email: {
    type: String,
    required: true,
    trim: true,
    mindlength: 1
  }
});

var newUser = new User({ email: "trandattin1995@gmail.com" });

newUser.save().then(
  doc => {
    console.log("User is created0", doc);
  },
  e => {
    console.log("Fail to create user", e);
  }
);

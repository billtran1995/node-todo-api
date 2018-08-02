const mongoose = require("mongoose");

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

module.exports = { Todo };

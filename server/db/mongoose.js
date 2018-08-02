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

module.exports = {
  mongoose
};

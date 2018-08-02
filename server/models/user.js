const mongoose = require("mongoose");

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

//   var newUser = new User({ email: "trandattin1995@gmail.com" });

//   newUser.save().then(
//     doc => {
//       console.log("User is created0", doc);
//     },
//     e => {
//       console.log("Fail to create user", e);
//     }
//   );

module.exports = { User };

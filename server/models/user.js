const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

/* ----------------------------------------------------------------------------------*/
// User model
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    mindlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "{value} is not a valid email."
    }
  },
  password: {
    type: String,
    require: true,
    mindlength: 6
  },
  tokens: [
    {
      access: {
        type: String,
        require: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});

console.log(UserSchema.methods);
UserSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject(); // Convert a mongoose doc to regular object

  return _.pick(userObject, ["_id", "email"]);
};

UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = "auth";
  var token = jwt
    .sign({ _id: user._id.toHexString(), access }, "abc123")
    .toString();

  user.tokens.push({
    access,
    token
  });

  // user.tokens.concat([
  //   {
  //     access,
  //     token
  //   }
  // ]);

  return user.save().then(() => {
    return token;
  });
};
console.log(UserSchema.methods);

UserSchema.statics.findByToken = function(token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, "abc123");
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    "tokens.token": token,
    "tokens.access": "auth"
  });
};

var User = mongoose.model("User", UserSchema);

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

const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

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
    .sign({ _id: user._id.toHexString(), access }, process.env.JWT_SECRET)
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
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    "tokens.token": token, // Use " " to query nested items
    "tokens.access": "auth"
  });
};

UserSchema.statics.findByCredentials = function(email, password) {
  var User = this;

  return User.findOne({ email }).then(user => {
    if (!user) return Promise.reject();

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

UserSchema.methods.removeToken = function(token) {
  var user = this;

  return user.update({
    $pull: {
      tokens: {
        token
      }
    }
  });
};

UserSchema.pre("save", function(next) {
  var user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hashedpassword) => {
        user.password = hashedpassword;
        next();
      });
    });
  } else {
    next();
  }
});

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

var passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy,
    mongoose = require("mongoose");

var User = mongoose.model("Users");

passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({username: username}, function(error, user) {
    if (error)
      return done(error);
    if (!user) {
      return done(null, false);
    } else {
      if (user.password != password) {
        return done(null, false);
      }
    }
    return done(null, user);
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(error, user) {
    if (error) {
      console.log(error);
      done(error);
    } else {
      done(null, user);
    }
  });
});

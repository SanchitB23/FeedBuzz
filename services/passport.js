const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
//Passport.js

const User = mongoose.model('users'); //1 args = Fetching (~Get)

passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser((id, done) => {
  User.findById(id)
      .then(user => {
        done(null, user)
      })
});

passport.use('google', new GoogleStrategy({
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    }, async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({googleId: profile.id});
      if (!existingUser) {
        const user = await new User({googleId: profile.id, createdAt: Date.now()}).save();
        return done(null, user);
      }
      console.log("User Exists");
      done(null, existingUser)
    })
);

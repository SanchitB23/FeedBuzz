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
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  // console.log("\naccess Token: \n", accessToken + "\n\nRefresh Token", refreshToken, "\n\nProfile: \n" + profile, +"\n\nDone: \n" + done);
  User.findOne({googleId: profile.id})
      .then(existingUser => {
        if (!existingUser)
          new User({googleId: profile.id, createdAt: Date.now()}).save()
              .then(user => done(null, user));
        else {
          console.log("User Exists");
          done(null, existingUser)
        }
      })
      .catch(error => console.error(error))
}));

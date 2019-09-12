const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
//Passport.js

const User = mongoose.model('users'); //1 args = Fetching (~Get)

passport.use('google', new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile) => {
  // console.log("\naccess Token: \n", accessToken + "\n\nRefresh Token", refreshToken, "\n\nProfile: \n" + profile, +"\n\nDone: \n" + done);
  new User({googleId: profile.id, createdAt: Date.now()}).save()
}));

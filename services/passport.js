const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
//Passport.js
passport.use('google', new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  console.log("Access Token: ", accessToken);
  console.log("Refresh Token: ", refreshToken);
  console.log("Profile Info: ", profile);
}));

module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  /*DBUser*/
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,

  /*Stripe Keys*/
  StripePublishableKey:process.env.STRIPE_PUBLISHABLE_KEY,
  StripeSecretKey:process.env.STRIPE_SECRET_KEY
};

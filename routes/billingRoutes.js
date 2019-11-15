const keys = require('../config/keys');
const stripe = require('stripe')(keys.StripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {

  app.post('/api/stripe', requireLogin, async (req, res) => {
    // console.log(req.body);


    const charge = await stripe.charges.create({
      amount: 100,
      currency: 'inr',
      description: '₹1 for Payment for 5 credits',
      source: req.body.id
    });

    // console.log(charge);
    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
    res.redirect('/surveys');
  })
};

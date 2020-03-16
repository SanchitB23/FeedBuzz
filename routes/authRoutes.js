const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');

//Auth Routes
module.exports = (app) => {

  //info Initiates Google OAuth
  app.get(
      '/auth/google',
      passport.authenticate('google', {
        scope: ['profile', 'email']
      }));

  //info Callbacks for Google OAuth
  app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/surveys');
  });

  //Logout (All)
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/')
  });

  //  Gets Info of Current user (in JSON)
  app.get('/api/current_user', (req, res) => {
    res.send(req.user)
  });

  app.post('/api/update_user_data', (req, res) => {
    const {_id, name, companyName, companySignature} = req.body;
    User.updateOne({
      _id
    }, {
      $set: {
        name,
        companyName,
        companySignature
      }
    }).exec();
    res.status("200").send(req.body)
  })
};

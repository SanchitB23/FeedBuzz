const passport = require('passport');
//Auth Routes
module.exports = (app) => {

  //info Initiates Google OAuth
  app.get(
      '/auth/google',
      passport.authenticate('google', {
        scope: ['profile', 'email']
      }));

  //info Callbacks for Google OAuth
  app.get('/auth/google/callback', passport.authenticate('google'));

  //Logout (All)
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user)
  });
  // INFO Gets Info of Current user (in JSON)
  app.get('/api/current_user', (req, res) => {
    //temp res.send(req.session); 
    res.send(req.user)
  })
};

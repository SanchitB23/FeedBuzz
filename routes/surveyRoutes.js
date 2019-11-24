/*
  idea Custom Linker from Email to form something
  app.get('/api/end_user/fill_form',(req,res) => {
      req //get jis mail se click kiya hai uski details, survey details and all
    //res redirect to frontEnd url to fill survey
  })
*/

const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Survey = mongoose.model('surveys');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplate/surveyTemplate');

module.exports = (app) => {
  //idea Can be changed : Currently this is after the user responded function
  app.get('/api/surveys/thanks', (req, res) => {
    console.log(req);
    res.send('Thank you for your response')
  });
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => { //fixme require credits not working, number goes negative
    const {title, subject, body, recipients} = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({email: email.trim()})),
      _user: req.user.id,
      dateSent: Date.now() //idea for Creating draft this needs to be changes
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send(); //sends mail
      await survey.save(); //saves survey to mongoDb
      req.user.credits -= 1; //deducts credits
      const user = await req.user.save(); //saves update done to user
      res.send(user)
    } catch (e) {
      res.status(422).send(e);
    }
  });
};

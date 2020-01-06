/*
  idea Custom Linker from Email to form something
  app.get('/api/end_user/fill_form',(req,res) => {
      req //get jis mail se click kiya hai uski details, survey details and all
    //res redirect to frontEnd url to fill survey
  })
*/
const _ = require('lodash');
const Path = require('path-parser').Path;
const {URL} = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Survey = mongoose.model('surveys');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplate/surveyTemplate');


module.exports = (app) => {


  //idea Can be changed : Currently this is after the user responded function / beautify | Use HTML CSS | Use res.redirect ->ref authRoutes
  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    console.log("something");
    res.send('working'); //fixme
  });


  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => { //todo show error on UI if low credits
    const {title, subject, body, recipients} = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({email: email.trim()})),
      _user: req.user.id,
      dateSent: Date.now()//Date.now() //idea for Creating draft this needs to be changes
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


  app.post('/api/surveys/webhooks', (request, result) => {
    const p = new Path('/api/surveys/:surveyId/:choice');
    const event = _.chain(request.body)
        // Parse data for email,id,choice
        .map(({email, url}) => {
          const match = p.test(new URL(url).pathname);
          if (match) return {email, surveyId: match.surveyId, choice: match.choice === 'thanks' ? 'yes' : 'no'}
        })
        //removes null elements
        .compact()
        //Checks and returns only unique elements
        .uniqBy('email', 'surveyId')
        //info Updating in MongoDB
        .forEach(({surveyId, email, choice}) => {
          Survey.updateOne({
            _id: surveyId,
            recipients: {
              $elemMatch: {email: email, responded: false}
            }
          }, {
            $inc: {[choice]: 1},
            $set: {'recipients.$.responded': true},
            lastResponse: new Date()
          }).exec()
        })
        .value();
    console.log(event);
  });


  app.get('/api/surveys', requireLogin, async (req, result) => {
    const userSurveys = await Survey.find({_user: req.user.id});
    result.send(userSurveys)
  })
};

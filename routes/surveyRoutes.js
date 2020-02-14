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


  app.get('/api/surveys/response/:choice', (req, res) => {
    console.log("something");
    res.redirect('/surveys/response'); //info Working in PROD
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
    const p = new Path('/api/surveys/response/:choice');
    const event = _.chain(request.body)
        // Parse data for email,id,choice
        .map((event) => {
          if (event.url) {
            // console.log("if", dateIndia.toLocaleTimeString(), event);
            const match = p.test(new URL(event.url).pathname);
            // console.log("Match", match, "url: ", event.url, "P.test", p.test(new URL(event.url).pathname), "Pathname", new URL(event.url).pathname);
            if (match) return {
              email: event.email,
              // surveyId: match.surveyId,
              choice: match.choice === 'thanks' ? 'yes' : 'no',
              event: event.event,
              surveyId: event.surveyIdArgs,
            }
          } else {
            // console.log("else", dateIndia.toLocaleTimeString(), event);
            return {
              event: event.event,
              surveyId: event.surveyIdArgs,
              email: event.email,
            }
          }
        })
        //removes null elements
        .compact()
        //Checks and returns only unique elements
        .uniqBy('email', 'surveyId')
        //Updating in MongoDB
        .forEach((event) => {
          // console.log("In Survey", event.dateTime.toLocaleString(), event);
          if (event.event === 'click') {
            Survey.updateOne({
              _id: event.surveyId,
              recipients: {
                $elemMatch: {email: event.email, responded: false}
              }
            }, {
              $inc: {[event.choice]: 1},
              $set: {'recipients.$.responded': true},
              lastResponse: new Date()
            }).exec()
          } else if (event.event === 'open') {
            Survey.updateOne({
              _id: event.surveyId,
              recipients: {
                $elemMatch: {email: event.email}
              }
            }, {
              $inc: {'recipients.$.timesOpened': 1},
              $set: {'recipients.$.hasOpened': true},
            }).exec()
          }
        })
        .value();
    // result.send({})
    // console.log(event);
  });


  app.get('/api/surveys', requireLogin, async (req, result) => {
    const userSurveys = await Survey
        .find({_user: req.user.id})
        .select({recipients: false});
    result.send(userSurveys)
  })
};

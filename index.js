const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const {cookieKey} = require("./config/keys");
const {mongoURI} = require("./config/keys");
require("./models/User"); //Loads the config
require('./models/Survey');
require("./services/passport");

mongoose.connect(mongoURI, {useNewUrlParser: true})
    .then(() => console.log("Mongo Connected"))
    .catch(e => console.log("Mongo Error", e));

const app = express();
app.use(bodyParser.json());
app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app); //??
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

/* app.get('/', (req, res) => {
  res.send({
    hi: 'there',
    bye:'buddy'
  })
}); */

const PORT = process.env.PORT || 5000;
app.listen(PORT);

//Saving Model Instance: Data doesnt store to MongoAtlas. DONE: Solution using Node v2.2.12 or later in MongoDB Atlas

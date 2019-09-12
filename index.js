const express = require('express');
const mongoose = require('mongoose');
require("./models/User"); //Loads the config
require("./services/passport");

const {mongoURI} = require("./config/keys");
mongoose.connect(mongoURI, {useNewUrlParser: true})
    .then(() => console.log("Mongo Connected"))
    .catch(e => console.log("Mongo Error", e));

const app = express();

require("./routes/authRoutes")(app);


/* app.get('/', (req, res) => {
  res.send({
    hi: 'there',
    bye:'buddy'
  })
}); */

const PORT = process.env.PORT || 5000;
app.listen(PORT);

//Saving Model Instance: Data doesnt store to MongoAtlas. DONE: Solution using Node v2.2.12 or later in MongoDB Atlas

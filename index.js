const express = require('express');
const mongoose = require('mongoose');
require("./models/User");
require("./services/passport");

const {mongoURI} = require("./config/keys");

async function x() {
  console.log("Test", mongoURI);
// todo Use MongoCLi (try) Mongoose Hangs, Check reply in issues: DONE: Error: IP Addr problem.
  const m = await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    dbName: 'Users'
  }, (onerror) => console.log("Err", onerror))
      .then(r => console.log("Then", r))
      .catch(r => console.log("Catch", r))
      .finally(r => console.log("Finally", r));
  console.log("Test2", m);

}

x().then(r => console.log(r, "what")).catch(r => console.log("galti", r));
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

// todo Saving Model Instance: Data doesnt store to MongoAtlas.

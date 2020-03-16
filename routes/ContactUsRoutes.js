const mongoose = require('mongoose');
const ContactUs = mongoose.model('contactUs');

module.exports = app => {

  app.post('/api/contact-us', async (req, res) => {
    const {name, email, message} = req.body;
    const contactUsSchemaData = new ContactUs({
      name, email, message, date: Date.now()
    });
    try {
      await contactUsSchemaData.save(); //saves survey to mongoDb
      res.status(204)
    } catch (e) {
      res.status(503).send(e)
    }
  });

  app.get('/api/contact-us', async (req, res) => {
    const contactUsData = await ContactUs.find({});
    res.status(200).send(contactUsData)
  })

};

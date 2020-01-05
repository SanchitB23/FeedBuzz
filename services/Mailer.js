const sendGrid = require('sendgrid');
const helper = sendGrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  constructor({subject, recipients}, content) {
    super();
    this.sendGridAPI = sendGrid(keys.sendGridKey);
    this.from_email = new helper.Email('no-reply@feedbuzz-project.herokuapp.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    this.addContent(this.body); //helper.Mail function
    this.addClickTracking();
    this.addRecipients();
  }

  formatAddresses(recipients) {
    return recipients.map(({email}) => {
      return new helper.Email(email);
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings)
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient => personalize.addTo(recipient));
    this.addPersonalization(personalize);
  }

  async send() { //DONEfixme error when sending to google IDs etc
    const request = this.sendGridAPI.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });
    return await this.sendGridAPI.API(request); //Converts all this.<vars> to JSON and uses our sendGridAPI to send it
  }

}

module.exports = Mailer;

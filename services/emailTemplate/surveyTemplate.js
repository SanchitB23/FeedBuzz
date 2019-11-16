const keys = require('../../config/keys');
module.exports = (survey) => {
  return `
  <html lang="en">
    <body>
      <div style="text-align: center">
        <h3>We'd like your input!</h3>
        <p>Please answer the following question to help us serve you better</p>
        <p>${survey.body}</p>
        <div>
          <a href="${keys.surveyAnswerRedirectDomain}/api/surveys/thanks">Yes</a>
        </div>
        <div>
          <a href="${keys.surveyAnswerRedirectDomain}/api/surveys/thanks">No</a>
        </div>
      </div>
    </body>
  </html>
  `;
};

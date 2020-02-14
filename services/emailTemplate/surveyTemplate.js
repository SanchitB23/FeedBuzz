const keys = require('../../config/keys');
module.exports = (survey) => {
  return `
    <html lang="en">
    <head>
        <style>
            p {
                font-family: "Roboto", sans-serif;
                color: #23A0D3;
            }
    
            button {
                transition-duration: 0.4s;
                background-color: white;
                color: black;
                padding: 10px 32px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: medium;
                border-radius: 4px;
            }
            #yes{
                border: 2px solid limegreen;
            }
            #no{
                border: 2px solid tomato;
            }
            #yes:hover{
                background-color: limegreen;
            }
            #no:hover{
                background-color: tomato;
            }
            button:hover {
                color: whitesmoke;
                cursor:pointer;
            }
        </style>
    </head>
    <body>
    <div style="text-align: center">
        <p style="font-size: x-large">We'd like your input!</p>
        <p style="font-size: large">Please answer the following question to help us serve you better</p>
        <p style="font-size: larger;font-weight: bold">${survey.body}</p>
        <div style="margin-top: 20px">
            <a href="${keys.surveyAnswerRedirectDomain}/api/surveys/response/thanks" style="margin-right:40px">
                <button id="yes">Yes</button>
            </a>
            <a href="${keys.surveyAnswerRedirectDomain}/api/surveys/response/sorry">
                <button id="no">No</button>
            </a>
        </div>
    </div>
    </body>
    </html>
  `;
};

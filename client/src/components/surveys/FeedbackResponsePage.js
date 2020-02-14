import React from 'react';
import Ill_thanks from "../../resources/Illus_SurveyResponseThanks.png"
import assets from "../../resources/info";

const FeedbackResponse = () => {
  return (
      <div className={'container'} class="center-align">
        <img src={Ill_thanks} alt={"Error: Page Not Found"} height="350"
             className="center-block" style={{padding: "5% 0 3% 0"}}/>
        <h4 style={{textAlign: 'center', color: assets["secondary-color-green"], textTransform: 'capitalize'}}>Thank you
          for your
          response!</h4>
      </div>
  );
};

export default FeedbackResponse;

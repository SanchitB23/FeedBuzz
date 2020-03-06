import React, {Component} from 'react';
import {connect} from 'react-redux';
import formFields from "./formFields";
import _ from "lodash";

import {submitSurvey} from "../../actions";
import {withRouter} from "react-router-dom";


function mapStateToProps(state) {
  const {surveyForm: {values}} = state.form;
  return {values}
}

class SurveyFormReview extends Component {
  renderFormReviewFields = _.map(formFields, field => {
    return (
        <div key={field.name}>
          <label>{field.label}</label>
          <div>{this.props.values[field.name]}</div>
        </div>
    )
  });

  render() {
    const {onCancel, values, submitSurvey, history} = this.props;
    return (
        <div>
          <h4>Please Confirm your entries</h4>
          <div className="card-content">{this.renderFormReviewFields}</div>
          <button
              onClick={onCancel}
              className="yellow darken-3 btn-flat">
            Go Back
          </button>
          <button
              type='submit'
              onClick={() => submitSurvey(values, history)}
              className="green right btn-flat">
            Save and Send
            <i className="material-icons right ">email</i>
          </button>
        </div>
    );
  }
}

export default connect(
    mapStateToProps, {submitSurvey}
)(withRouter(SurveyFormReview));

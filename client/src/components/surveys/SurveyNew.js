import React, {Component} from 'react';
import {reduxForm} from "redux-form";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

//This -> SurveyForm  + FormReview
class SurveyNew extends Component {
  state = {
    showFormReview: false
  };

  renderContent() {
    if (this.state.showFormReview) return <SurveyFormReview onCancel={() => {
      this.setState({showFormReview: false})
    }}/>;
    return <SurveyForm
        onSurveySubmit={() => {
          this.setState({showFormReview: true})
        }}
    />
  }

  render() {
    if (!this.props.auth) return <Redirect to="/auth_error"/>;
    return (
        <div>
          {this.renderContent()}
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {auth: state.auth};
}

export default reduxForm({
  form: 'surveyForm'
})(connect(mapStateToProps)(SurveyNew));

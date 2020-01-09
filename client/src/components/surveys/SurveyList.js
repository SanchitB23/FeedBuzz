import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchSurveys} from "../../actions";

function mapStateToProps(state) {
  return {surveys: state.surveys};
}

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurvey();
  }

  renderSurveys() {
    let surveys = this.props.surveys;
    // console.log(surveys);
    if (surveys.length)
      return surveys.reverse().map((survey) => {
        return (
            <div className={"card darken-1"} key={survey._id}>
              <div className={"card-content"}>
                <span className={"card-title"}>{survey.title}</span>
                <p>{survey.body}</p>
                <p className={"right"}>
                  Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                </p>
              </div>
              <div className={"card-action"}>
                <a>Yes:{survey.yes}</a>
                <a>No:{survey.no}</a>
              </div>
            </div>
        )
      });
    else return <h3>No Surveys Created</h3>
  }

  render() {
    return (
        <div>
          {this.renderSurveys()}
        </div>
    );
  }
}

export default connect(
    mapStateToProps, {fetchSurvey: fetchSurveys}
)(SurveyList);

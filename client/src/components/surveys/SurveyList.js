import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchSurvey, fetchSurveys} from "../../actions";
import assets from "../../resources/info";
import IllNoSurvey from '../../resources/No Surveys Illus.png'

function mapStateToProps(state) {
  return {surveys: state.surveys};
}

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    const {surveys} = this.props;
    console.log("Survey List", surveys);
    if (surveys.length)
      return surveys.reverse().map((survey) => {
        return (
            <div className={"card darken-1"} key={survey._id}>
              <div className={"card-content"}>
                <span className={"card-title"}>{survey.title}</span>
                <p>{survey.subject}</p>
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
    else return (
        <>
          <img src={IllNoSurvey} alt={"Error: Page Not Found"} height={400}
               style={{margin: "3% auto", display: "block"}}/>
          <h4 style={{textAlign: 'center', color: assets["secondary-color-green"]}}>No Surveys Found!<br/>Click Here to
            create one<i className="material-icons">arrow_forward</i></h4>
        </>
    )
  }

  render() {
    return (
        <>
          {this.renderSurveys()}
        </>
    );
  }
}

export default connect(
    mapStateToProps, {fetchSurveys, fetchSurvey}
)(SurveyList);

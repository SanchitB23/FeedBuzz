import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchSurveys} from "../../actions";
import assets from "../../resources/info";
import IllNoSurvey from '../../resources/No Surveys Illus.png'

function mapStateToProps(state) {
  return {surveys: state.surveys};
}

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurvey();
  }

  renderSurveys() {
    let surveys = this.props.surveys;
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
    else return (
        <>
          <img src={IllNoSurvey} alt={"Error: Page Not Found"} height={400}
               style={{margin: "3% auto", display: "block"}}/>
          <h4 style={{textAlign: 'center', color: assets["secondary-color-green"]}}>No Surveys Found!<br/>Click Here to
            create one<i className="material-icons">arrow_forward</i></h4>
          <h4 style={{textAlign: 'center', color: assets["secondary-color-green"]}}>Invalid Login Information<br/>Please
            Sign In again!</h4>
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
    mapStateToProps, {fetchSurvey: fetchSurveys}
)(SurveyList);

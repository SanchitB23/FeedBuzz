import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchSurvey} from "../../actions";
import Loading from "../Loading";
import {Accordion, Card} from "react-bootstrap";


function mapStateToProps({surveyDetails}) {
  return {surveyDetails: surveyDetails[0]};
}

class SurveyDetail extends Component {
  componentDidMount() {
    this.props.fetchSurvey(this.props.match.params.surveyId);
  }

  render() {
    const {surveyDetails} = this.props;
    if (!surveyDetails) return <div className="container" style={{height: "100%"}}>{Loading()}</div>;
    return (
        <div className="container">
          <div style={{margin: "2% 0", display: "flex", justifyContent: "space-between"}}>
            <a className="waves-effect waves-light btn grey white-text">Go Back<i
                className="fas fa-angle-left left"/> </a>
            <a className="waves-effect waves-light btn red white-text">Delete this
              Survey<i className="fas fa-trash left"/> </a>
          </div>
          {this.renderContents(surveyDetails)}
        </div>
    )
  }

  renderContents(survey) {
    // console.log("content", survey);
    console.log(new Date(survey.lastResponse).toLocaleString());
    return <div className="card">
      <div className="card-content">
        <h5>Survey Title: {survey.title}</h5>
        <h6>Email Subject: {survey.subject}</h6>
        <h6>Email Body</h6>
        <p className="container" style={{marginLeft: "10px"}}>{survey.body}</p>
        <h6>Recipient List</h6>
        <Accordion>
          {
            survey.recipients.map((recipient, i) => (
                    <Card key={i}>
                      <Accordion.Toggle as={Card.Header} eventKey={i}
                                        style={{display: "flex", justifyContent: "space-between"}}>
                        <div>{i + 1}. {recipient.email}</div>
                        <i className="fas fa-chevron-circle-down"/>
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey={i}>
                        <Card.Body>
                          Opened: {recipient.hasOpened ? "Yes" : "No"}<br/>
                          Responded: {recipient.responded ? "Yes" : "No"}<br/>
                          Times Opened: {recipient.timesOpened}
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                )
            )
          }
        </Accordion>
        <p>Latest Response: {
          survey.lastResponse ? new Date(survey.lastResponse).toLocaleString() : "No Data Available"
        }</p>
      </div>
    </div>
  }
}

export default connect(
    mapStateToProps, {fetchSurvey}
)(SurveyDetail);

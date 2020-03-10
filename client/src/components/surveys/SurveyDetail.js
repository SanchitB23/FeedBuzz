import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteSurvey, fetchSurvey} from "../../actions";
import Loading from "../Loading";
import {Accordion, Card, Modal} from "react-bootstrap";
import CanvasJSReact from "../../styles/canvasjs.react";

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;


function mapStateToProps({surveyDetails}) {
  return {surveyDetails: surveyDetails[0]};
}

class SurveyDetail extends Component {
  componentDidMount() {
    this.props.fetchSurvey(this.props.match.params.surveyId);
  }

  state = {
    show: false,
  };

  render() {
    const {surveyDetails} = this.props;
    if (!surveyDetails) return <div className="container" style={{height: "100%"}}>{Loading()}</div>;
    return (
        <div className="container">
          <div style={{margin: "2% 0", display: "flex", justifyContent: "space-between"}}>
            <a className="waves-effect waves-light btn grey white-text" onClick={() => {
              this.props.history.goBack()
            }}>Go Back<i
                className="fas fa-angle-left left"/> </a>
            <a className="waves-effect waves-light btn red white-text"
               onClick={this.handleModalShow}>Delete this
              Survey<i className="fas fa-trash left"/> </a>
          </div>
          <Modal show={this.state.show} onHide={this.handleModalClose} size="sm" backdrop="false">
            <Modal.Header closeButton>
              <Modal.Title>Delete Survey {surveyDetails.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this Survey?</Modal.Body>
            <Modal.Footer>
              <button className="btn blue darken-1 btn-flat white-text" onClick={this.handleModalClose}>
                Close
              </button>
              <button className="btn red darken-1 btn-flat white-text"
                      onClick={() => this.deleteSurvey(surveyDetails._id)}>
                Delete Survey
              </button>
            </Modal.Footer>
          </Modal>
          {this.renderContents(surveyDetails)}
        </div>
    )
  }

  handleModalClose = () => {
    this.setState({show: false});
  };

  handleModalShow = () => {
    this.setState({show: true});
  };

  renderLeftContent(survey) {
    return (
        <div style={{width: "55%"}}>
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
                            Times Opened: {recipient.timesOpened}<br/>
                            Date of Response: {
                            recipient.responded ?
                                recipient.dateResponded ?
                                    `${new Date(recipient.dateResponded).toDateString()}  ${new Date(recipient.dateResponded).toLocaleTimeString()}` :
                                    "No Data" :
                                "Not yet Responded"
                          }
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                  )
              )
            }
          </Accordion>
        </div>
    )
  }

  renderRightContent(survey) {
    const totalResponse = survey.recipients.length;
    const notResponded = totalResponse - survey.no - survey.yes;
    const options = {
      animationEnabled: true,
      title: {
        text: "Customer Response Chart"
      },
      subtitles: [{
        text: `${Math.round((survey.yes / totalResponse) * 100).toFixed(1)}% Positive`,
        verticalAlign: "center",
        fontSize: 24,
        dockInsidePlotArea: true
      }],
      data: [{
        type: "doughnut",
        showInLegend: true,
        indexLabel: `{name}: #percent%`,
        yValueFormatString: "#,### 'votes'",
        dataPoints: [
          {name: "Yes", y: survey.yes},
          {name: "No", y: survey.no},
          {name: "Not Responded", y: notResponded},
        ]
      }]
    };
    return (
        <div style={{width: "40%"}}>
          <h6 style={{paddingBottom: "10%"}}>Date
            Created: {new Date(survey.dateSent).toDateString()} {new Date(survey.dateSent).toLocaleTimeString()}</h6>
          <CanvasJSChart options={options}/>
        </div>
    )
  }

  renderContents(survey) {
    // console.log("content", survey);
    console.log(survey);
    return (
        <div className="card">
          <div className="card-content">
            <div style={{display: "flex", justifyContent: "space-between"}}>
              {this.renderLeftContent(survey)}
              {this.renderRightContent(survey)}
            </div>
            <h6>Latest Response: {
              survey.lastResponse ? `${new Date(survey.dateSent).toDateString()}  ${new Date(survey.dateSent).toLocaleTimeString()}` : "No Data Available"
            }</h6>
          </div>
        </div>
    )
  }

  deleteSurvey(_id) {
    this.props.deleteSurvey(_id);
    this.props.history.push('/surveys');
  }
}

export default connect(
    mapStateToProps, {fetchSurvey, deleteSurvey}
)(SurveyDetail);

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteSurvey, fetchSurvey, fetchSurveys} from "../../actions";
import assets from "../../resources/info";
import IllNoSurvey from '../../resources/No Surveys Illus.png'
import {Link} from "react-router-dom";
import {Dropdown} from "react-bootstrap";


function mapStateToProps(state) {
  return {surveys: state.surveys};
}

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  state = {
    sortOrder: {
      key: 3,
      value: "Oldest First"
    }
  };

  renderSurveys() {
    const {surveys} = this.props;
    console.log("Survey List", surveys);
    if (surveys.length)
        // if (this.state.sortOrder.key === 2) {
      return surveys
          .sort((a, b) => {
            switch (this.state.sortOrder.key) {
              case 1:
                if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                else return -1;
              case 0:
                if (a.title.toLowerCase() < b.title.toLowerCase()) return 1;
                else return -1;
              case 2:
                if (a.dateSent < b.dateSent) return 1;
                else return -1;
              case 3:
                if (a.dateSent > b.dateSent) return 1;
                else return -1;
            }
          })
          .map((survey) => {
            return (
                <div className={"card darken-1"} key={survey._id}>
                  <div className={"card-content"}>
                    <span className={"card-title"}>{survey.title}</span>
                    <p>{survey.subject}</p>
                    <p className={"right"}>
                      Sent On: {new Date(survey.dateSent).toLocaleString()}
                    </p>
                  </div>
                  <div className={"card-action"}>
                    <a>Yes:{survey.yes}</a>
                    <a>No:{survey.no}</a>
                    <div className="right">
                      <Link to={`${'/surveys/survey_detail/' + survey._id}`}
                            className="btn blue darken-1 btn-flat white-text"
                            style={{"marginRight": '10px'}}>
                        View
                        <i className="material-icons white-text left">remove_red_eye</i>
                      </Link>
                      <a className="btn red darken-1 btn-flat white-text"
                         onClick={() => this.deleteSurveyModal(survey._id)}>
                        {/*<i class="fas fa-trash"></i>*/}
                        Delete
                        <i className="material-icons white-text left">delete</i>
                      </a>
                    </div>
                  </div>
                </div>
            )
          });
    // }
    else return (
        <>
          <img src={IllNoSurvey} alt={"Error: Page Not Found"} height={400}
               style={{margin: "3% auto", display: "block"}}/>
          <h4 style={{textAlign: 'center', color: assets["secondary-color-green"]}}>No Surveys Found!<br/>Click Here
            to
            create one<i className="material-icons">arrow_forward</i></h4>
        </>
    )
  }

  deleteSurveyModal(_id) {
    this.props.deleteSurvey(_id)
  }

  render() {
    console.log("List", this.state);
    return (
        <>
          <div style={{display: "flex", justifyContent: "flex-end", alignItems: "center", paddingTop: "1rem"}}>
            <Dropdown>
              <Dropdown.Toggle variant="info" id="dropdown-basic">
                Sort by: {this.state.sortOrder.value}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1" onClick={() => {
                  this.changeSortOrder(1)
                }}>A-Z</Dropdown.Item>
                <Dropdown.Item href="#/action-1" onClick={() => {
                  this.changeSortOrder(0)
                }}>Z-A</Dropdown.Item>
                <Dropdown.Item href="#/action-2" onClick={() => {
                  this.changeSortOrder(2)
                }}>Newest First</Dropdown.Item>
                <Dropdown.Item href="#/action-3" onClick={() => {
                  this.changeSortOrder(3)
                }}>Oldest First</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <hr/>
          {this.renderSurveys()}
        </>
    );
  }

  changeSortOrder(val) {
    switch (val) {
      case 0:
        this.setState({
          sortOrder: {
            key: 0,
            value: "Z-A"
          }
        });
        break;
      case 1:
        this.setState({
          sortOrder: {
            key: 1,
            value: "A-Z"
          }
        });
        break;
      case 2:
        this.setState({
          sortOrder: {
            key: 2,
            value: "Newest First"
          }
        });
        break;
      case 3:
        this.setState({
          sortOrder: {
            key: 3,
            value: "Oldest First"
          }
        });
        break;
    }
  }
}

export default connect(
    mapStateToProps, {fetchSurveys, fetchSurvey, deleteSurvey}
)(SurveyList);

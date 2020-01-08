import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import SurveyList from "./surveys/SurveyList";

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

class Dashboard extends Component {
  render() {
    return (
        <div>
          <SurveyList/>
          <div className="fixed-action-btn">
            <Link to={'/surveys/new'} className="btn-floating btn-large red">
              <i className="material-icons">add</i>
            </Link>
          </div>
        </div>
    );
  }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Dashboard);

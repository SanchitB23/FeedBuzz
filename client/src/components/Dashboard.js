import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from "react-router-dom";
import SurveyList from "./surveys/SurveyList";

function mapStateToProps(state) {
  return {auth: state.auth};
}

class Dashboard extends Component {
  render() {
    if (!this.props.auth) return <Redirect to="/auth_error"/>;
    return (
        <div>
          <SurveyList/>
          <div className="fixed-action-btn">
            <Link to={'/surveys/new'} className="btn-floating btn-large red pulse">
              <i className="material-icons">add</i>
            </Link>
          </div>
        </div>
    );
  }
}

export default connect(
    mapStateToProps
)(Dashboard);

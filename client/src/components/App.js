import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import M from "materialize-css";


import Header from "./Header";
import {fetchUser} from "../actions";
import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";
import FeedbackResponsePage from "./surveys/FeedbackResponsePage";
import ErrorPage404 from "./ErrorPage404";
import AuthError from "./AuthError";
// import TestingPage from "./TestingPage";

// todo HTML File fix
class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    M.AutoInit()
  }

  render() {
    console.log(this.props.auth);
    return (
        <BrowserRouter>
          <Header/>
          <div>
            <Switch>
              <Route exact path="/" component={LandingPage.bind(this)}/>
              <Route exact path="/surveys" component={Dashboard}/>
              <Route exact path="/surveys/new" component={SurveyNew}/>
              <Route exact path="/surveys/response" component={FeedbackResponsePage}/>
              {/*<Route exact path="/test" component={TestingPage}/> /!* temp*!/*/}
              <Route exact={true} path="*/auth_error" component={AuthError}/>
              <Route component={ErrorPage404}/>
            </Switch>
          </div>
        </BrowserRouter>

    );
  }
}

function mapStateToProps(state) {
  return {auth: state.auth};
}

export default connect(mapStateToProps
    , {fetchUser}
)(App);

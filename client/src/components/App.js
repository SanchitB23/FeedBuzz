import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import M from "materialize-css";
import svg from "../resources/MaintainanceIllus.svg";


import Header from "./Header";
import {fetchUser} from "../actions";
import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";
import FeedbackResponsePage from "./surveys/FeedbackResponsePage";
import ErrorPage404 from "./ErrorPage404";
import AuthError from "./AuthError";
import Footer from "./Footer";
import SurveyDetail from "./surveys/SurveyDetail"
import AboutUsPage from "./AboutUsPage";
import UserProfilePage from "./UserProfilePage";
import ContactUsPage from "./ContactUsPage";
// import TestingPage from "./TestingPage";
import assets from "../resources/info";
import TermsAndConditionsPage from "./TermsAndConditionsPage";

// todo HTML File fix

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    M.AutoInit() //no use
  }

  maintenancePage = () => (
      <div className="container">
        <div className="card">
          <div style={{display: "flex", flexDirection: 'column', alignItems: "center", padding: "20px 0px"}}>
            <img src={svg} alt="" height="300" width="300"/>
            <h4 style={{color: assets["secondary-color-green"]}} className="text-capitalize">Feature under
              Maintenance</h4>
          </div>
        </div>
      </div>
  );

  render() {
    // console.log(this.props.auth);
    return (
        <BrowserRouter>
          <Header/>
          <Switch>
            <Route exact path="/" component={LandingPage.bind(this)}/>
            <Route exact path="/surveys" component={Dashboard}/>
            <Route exact path="/surveys/new" component={SurveyNew}/>
            <Route exact path="/surveys/response" component={FeedbackResponsePage}/>
            <Route exact path="/surveys/survey_detail/:surveyId" component={SurveyDetail}/>
            <Route exact path="/about_us" component={AboutUsPage}/>
            <Route exact path="/contact_us" component={ContactUsPage}/>
            <Route exact path="/my_profile" component={UserProfilePage}/>
            <Route exact path="/admin" component={this.maintenancePage}/>
            <Route exact path="/terms" component={TermsAndConditionsPage}/>
            {/*<Route exact path="/test" component={TestingPage}/> /!* temp*!/*/}
            <Route exact={true} path="*/auth_error" component={AuthError}/>
            <Route component={ErrorPage404}/>
          </Switch>
          <Footer/>
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

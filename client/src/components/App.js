import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route} from "react-router-dom";
import Header from "./Header";
import {fetchUser} from "../actions";
import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";
import FeedbackResponsePage from "./surveys/FeedbackResponsePage";


// todo HTML File fix
class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
        <BrowserRouter>
          <Header/>
          <div className='container'>
            <Route exact path="/" component={LandingPage.bind(this)}/>
            <Route exact path="/surveys" component={Dashboard}/>
            <Route exact path="/surveys/new" component={SurveyNew}/>
            <Route exact path="/surveys/thanks" component={FeedbackResponsePage}/>
          </div>
        </BrowserRouter>
    );
  }
}

export default connect(
    '', {fetchUser}
)(App);

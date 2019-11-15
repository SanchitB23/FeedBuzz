import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route} from "react-router-dom";
import Header from "./Header";
import {fetchUser} from "../actions";
import LandingPage from "./LandingPage";

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>Survey New</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
//idea Add user login check to redirect to landing or survey page
  render() {
    return (
        <div className="container">
          <BrowserRouter>
            <div>
              <Header/>
              <Route exact path="/" component={LandingPage.bind(this)}/>
              <Route exact path="/surveys" component={Dashboard}/>
              <Route exact path="/surveys/new" component={SurveyNew}/>
            </div>
          </BrowserRouter>
        </div>
    );
  }
}

export default connect(
    '', {fetchUser}
)(App);

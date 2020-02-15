import React, {Component} from 'react';
import {connect} from 'react-redux';

import assets from "../resources/info";
import IllAuth from '../resources/Illus_AuthError.png'
import {Redirect} from "react-router-dom";

function mapStateToProps({auth}) {
  return {auth};
}

class AuthError extends Component {

  render() {
    if (this.props.auth) return <Redirect to="/surveys"/>;
    return (
        <div className="container"
             style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
          <img src={IllAuth} alt={"Error: Page Not Found"} height={350} style={{margin: "20px 0"}}/>
          <h4 style={{color: assets["secondary-color-green"], textAlign: "center", marginBottom: "20px"}}>Invalid Login
            Information<br/>Please
            Sign In again!</h4>
        </div>
    );
  }
}

export default connect(
    mapStateToProps,
)(AuthError);

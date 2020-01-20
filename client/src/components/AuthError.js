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
        <>
          <img src={IllAuth} alt={"Error: Page Not Found"} height={400}
               style={{margin: "3% auto", display: "block"}}/>
          <h4 style={{textAlign: 'center', color: assets["secondary-color-green"]}}>Invalid Login Information<br/>Please
            Sign In again!</h4>
        </>
    );
  }
}

export default connect(
    mapStateToProps,
)(AuthError);

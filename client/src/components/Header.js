import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import StripeWrapper from "./StripeWrapper";


function mapStateToProps({auth}) {
  return {auth};
}

class Header extends Component {
// FIXED_fixme After Payment it shows as logged out - CWU in StripeWrapper
  renderContent() {
    switch (this.props.auth) {
      case null: //todo loading animation or something
        return;
      case false:
        return <li><a href="/auth/google">Login With Google</a></li>;
      default:
        return [
          <li key="1"><StripeWrapper/></li>,
          <li key="3" style={{margin: '0 10px'}}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key="2"><a href="/api/logout">Logout</a></li>
        ]
    }
  }

  render() {
    // console.log(this.props);
    return (
        <nav>
          <div className="nav-wrapper">
            <Link to={this.props.auth ? '/surveys' : '/'} className="left brand-logo">
              FeedBuzz</Link>
            <ul className="right">
              {/*<li><a>Login With Google</a></li>*/
                this.renderContent()
              }
            </ul>
          </div>
        </nav>
    );
  }
}

export default connect(
    mapStateToProps
)(Header);

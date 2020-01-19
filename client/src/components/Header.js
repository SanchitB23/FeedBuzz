import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import StripeWrapper from "./StripeWrapper";
import styles from "../styles/styles.module.css";
import assets from "../resources/info";


function mapStateToProps({auth}) {
  return {auth};
}

class Header extends Component {

  renderContent() {
    switch (this.props.auth) {
      case null: //todo loading animation or something
        return <li style={{fontSize: '20px'}}><i className={"fa fa-spinner fa-pulse small right"}/>Please Wait</li>;
      case false:
        return <li><a href="/auth/google" className={styles.headerText}><i
            className="fab fa-google-plus-g right red-text small"/>Login With</a></li>;
      default:
        return [
          <li key="1"><StripeWrapper/></li>,
          <li key="2" style={{margin: '0 10px'}} className={styles.headerText}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key="3"><a href='#' className={styles.headerText}><i
              className="fas fa-user-tie right"/> {this.props.auth.name}</a>
          </li>,
          <li key='4'><a href="/api/logout"><i className="fa fa-sign-out-alt"/></a></li>
        ]
    }
  }

  //<a href="/api/logout">Logout</a>
  render() {
    return (
        <div className="navbar-fixed">
          <nav style={{backgroundColor: assets["primary-color"]}}>
            <div className="nav-wrapper">
              <div className="container"> {/*temp*/}
                <Link to={this.props.auth ? '/surveys' : '/'} className={"brand-logo left"}
                      style={{fontFamily: "Lucida Calligraphy"}}>
                  FeedBuzz
                </Link>
                <ul className="right">
                  {this.renderContent()}
                </ul>
              </div>
            </div>
          </nav>
        </div>
    );
  }
}

export default connect(
    mapStateToProps
)(Header);

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
  state = {
    logoHover: false
  };

  renderRightContent() {
    switch (this.props.auth) {
      case null: //todo loading animation or something
        return <li style={{fontSize: '20px'}}><i className={"fa fa-spinner fa-pulse small right"}/>Please Wait</li>;
      case false:
        return <li><a href="/auth/google" className={styles.headerText}><i
            className="fab fa-google-plus-g right red-text small"/>Login With</a></li>;
      default:
        return [
          <li key="2" style={{margin: '0 10px'}} className={styles.headerText} onMouseOver={() => {
            console.log("Over")
          }}>
            <StripeWrapper header={true}/>
          </li>,
          <li key="3"><Link className={styles.headerText} to={'/my_profile'}><i
              className="fas fa-user-tie right"/> {this.props.auth.name}</Link>
          </li>,
          <li key='4'><a href="/api/logout"><i className="fa fa-sign-out-alt"/></a></li>
        ]
    }
  }

  toggleHover = () => {
    this.setState({logoHover: !this.state.logoHover});
  };

  //<a href="/api/logout">Logout</a>
  render() {
    let logoStyle;
    if (this.state.logoHover) {
      logoStyle = {
        fontFamily: "Lucida Calligraphy",
        textDecoration: "none",
        backgroundColor: "#E5A759",
        padding: "0 4px"
      }
    } else logoStyle = {
      fontFamily: "Lucida Calligraphy",
      textDecoration: "none",
      padding: "0 4px"
    };
    return (
        <div className="navbar-fixed">
          <nav style={{backgroundColor: assets["primary-color"]}}>
            <div className="nav-wrapper">
              <div className="container"> {/*temp*/}
                <Link to={this.props.auth ? '/surveys' : '/'} className={"brand-logo left"}
                      style={logoStyle} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
                  FeedBuzz
                </Link>
                <ul className="right">
                  {this.renderRightContent()}
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

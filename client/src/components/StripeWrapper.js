import React, {Component} from "react";
import StripeCheckout from "react-stripe-checkout";
import {connect} from "react-redux";
import {fetchUser, handleToken} from "../actions";

function mapStateToProps({auth}) {
  return {credits: auth.credits}
}

class StripeWrapper extends Component {
  state = {
    headerStripeHover: false
  };
  styleIcon = {
    cursor: "auto"
  };
  toggleHover = () => {
    this.setState({headerStripeHover: !this.state.headerStripeHover});
  };

  render() {
    let headerStripeStyle;
    if (this.state.headerStripeHover) {
      headerStripeStyle = {
        textDecoration: "none",
        backgroundColor: "#E5A759",
        padding: "0 4px",
        cursor: "pointer"
      }
    } else headerStripeStyle = {
      textDecoration: "none",
      padding: "0 4px"
    };
    return (
        <StripeCheckout
            name={"FeedBuzz"}
            description={"₹1 for 5 Credits"}
            amount={100}
            currency="INR"
            token={(token) =>
                this.props.handleToken(token)
            }
            stripeKey={process.env.REACT_APP_STRIPE_KEY}
        >
          {
            this.props.header ? this.props.credits ? (
                <div style={headerStripeStyle} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}
                >
                  Credits: {this.props.credits} <i style={this.styleIcon}
                                                   className="right far fa-plus-square green-text"/>
                </div>
            ) : "" : <i style={this.styleIcon} onMouseOver={this.styleIcon.cursor = "pointer"}
                        className={`${this.props.header ? 'right' : ""} far fa-plus-square green-text`}/>
          }
        </StripeCheckout>
    )
  }
}

export default connect(mapStateToProps, {handleToken, fetchUser})(StripeWrapper);

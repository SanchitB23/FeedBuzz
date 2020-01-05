import React, {Component} from "react";
import StripeCheckout from "react-stripe-checkout";
import {connect} from "react-redux";
import {fetchUser, handleToken} from "../actions";

class StripeWrapper extends Component {
  componentWillUnmount() {
    // this.props.fetchUser();
  }

  render() {
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
          <button className="btn">Add Credits</button>
        </StripeCheckout>
    )
  }
}

export default connect(null, {handleToken,fetchUser})(StripeWrapper);

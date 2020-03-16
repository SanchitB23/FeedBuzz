import React, {Component} from 'react';
import {connect} from 'react-redux';
import StripeWrapper from "./StripeWrapper";
import avatar from "../resources/DevPlaceholderAvatar/avatar_1.png"
import userFields from "../utils/userFormFieldsHelper";
import {updateUserInfo} from "../actions";

// todo Less loops more hardcoded iterations due to less data
function mapStateToProps({auth}) {
  return {auth};
}

class UserProfilePage extends Component {
  state = {
    canEdit: false,
    compUpdated: false,
    userData: {},
    errors: {}
  };

  render() {
    if ((!this.state.compUpdated) && this.props.auth) {
      console.log("in");
      this.setState({
        userData: {...this.props.auth},
        compUpdated: true,
      });
    }
    return (
        <div className="container">
          {this.props.auth ? (
              <div className="card">
                {this.state.canEdit ? this.renderForm() : this.renderDisplayInfo()}
              </div>
          ) : "Loading"}
        </div>
    );
  }

  renderDisplayInfo() {
    return (
        <div className="card-content" style={{display: "flex", justifyContent: "space-around"}}>
          <div>
            {
              userFields.map((element, i) => {
                if (element.label === "Credits")
                  return (
                      <div key={i} style={{padding: "1.5rem 1rem", fontSize: "22px",}}>
                        {element.label} : {this.state.userData[element.name]} <StripeWrapper header={false}/>
                      </div>
                  );
                return (
                    <div key={i} style={{padding: "1.5rem 1rem", fontSize: "22px"}}>
                      {element.label} : {this.state.userData[element.name] || "No Information"}
                    </div>
                )
              })
            }
          </div>
          <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
            <img src={avatar} alt=""/>
            <div>
              <button style={{width: "100%"}} className="btn btn-block yellow darken-3" onClick={() => {
                this.setState({canEdit: true});
              }}>
                <div><i className="fas fa-pencil-alt"/> Edit Details</div>
              </button>
            </div>
          </div>
        </div>
    )
  }

  renderForm() {
    return (
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="card-content" style={{display: "flex", justifyContent: "space-around"}}>
            <div style={{width: "50%"}}>
              {userFields.map((element, i) => {
                if (element.name === 'credits') return;
                if (element.name === 'companySignature') return (
                    <div className="form-group" key={i}>
                      <label className="col-form-label" htmlFor={element.name}>{element.label}</label>
                      <textarea className="form-control" id={element.name} name={element.name}
                                placeholder={this.state.userData[element.name] || "Enter Detail"}
                                onChange={this.handleOnChange.bind(this, element.name)}
                                value={this.state.userData[element.name]}
                                disabled={element.name === 'email'} rows="3"/>
                      <small
                          className={this.state.errors[element.name] ? "red-text" : element.name === 'email' ? "orange-text" : ""}>
                        {this.state.errors[element.name] || element.tooltip}</small>
                    </div>
                );
                return (
                    <div className="form-group" key={i}>
                      <label className="col-form-label" for={element.name}>{element.label}</label>
                      <input type="text" className="form-control" id={element.name} name={element.name}
                             placeholder={this.state.userData[element.name] || "Enter Detail"}
                             onChange={this.handleOnChange.bind(this, element.name)}
                             value={this.state.userData[element.name]}
                             disabled={element.name === 'email'}/>
                      <small
                          className={`${this.state.errors[element.name] ? "red-text" : element.name === 'email' ? "orange-text" : ""} text-capitalize`}>
                        {this.state.errors[element.name] || element.tooltip}</small>
                    </div>
                )
              })}
            </div>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
              <div>
                <img src={avatar} alt="User Display Image"/>
                <div style={{paddingTop: "10px", display: "flex", justifyContent: "space-between"}}>
                  <button className="text-wrap btn-outline-primary" style={{borderRadius: "3px", width: "120px"}}>Change
                    Display Image
                  </button>
                  <button className="text-wrap btn-outline-warning" style={{borderRadius: "3px", width: "120px"}}>
                    Remove Display Image
                  </button>
                </div>
              </div>
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <button type="reset" onClick={this.handleReset.bind(this)}
                        className="btn waves-effect waves-light red white-text">Discard
                </button>
                <button type="submit" className="btn waves-effect waves-light blue white-text">Save Changes</button>
              </div>
            </div>
          </div>
        </form>
    )
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.handleValidation()) {
      this.props.updateUserInfo(this.state.userData);
      this.setState({canEdit: false});
    } else console.log("Bad")
  };

  handleOnChange(name, e) {
    this.setState({userData: {...this.state.userData, [name]: e.target.value}})
  }

  handleReset() {
    console.log("clicked");
    this.setState({canEdit: false, userData: {...this.props.auth}, errors: {}})
  }

// todo refine Validation
  handleValidation() {
    let {userData} = this.state;
    let errors = {};
    let formIsValid = true;
    userFields.map(field => {
      // if (field.name === 'credits' || field.name === 'email') return;
      if (field.name === 'name') {
        if (!userData[field.name] || !(userData[field.name].length > 0)) {
          formIsValid = false;
          errors["name"] = "cannot be empty"
        }
        if (typeof userData[field.name] !== 'undefined') {
          if (!userData[field.name].match(/^[a-zA-Z ]+$/) && userData[field.name].length > 0) {
            formIsValid = false;
            errors[field.name] = "only Alphabets Allowed"
          }
          if (userData[field.name].length > 24) {
            formIsValid = false;
            errors["name"] = "Length Should be less than 24 characters"
          }
        }
      } else if (field.name === 'companyName')
        if (typeof userData[field.name] !== 'undefined') {
          if (!userData[field.name].match(/^[a-zA-Z-.& ]+$/) && userData[field.name].length > 0) {
            formIsValid = false;
            errors[field.name] = "only Alphabets, Dot(.), Ampersand(&) and Dashes(-) Allowed"
          }
          if (userData[field.name].length > 24) {
            formIsValid = false;
            errors["name"] = "Length Should be less than 24 characters"
          }
        }
    });
    this.setState({errors});
    return formIsValid
  }
}

export default connect(
    mapStateToProps, {updateUserInfo}
)(UserProfilePage);

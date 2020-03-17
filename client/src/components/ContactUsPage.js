import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Illus1} from '../resources/ContactUsIllus';
import {sendContactUsInfo} from "../actions";

class ContactUsPage extends Component {
  state = {
    formData: {
      name: "",
      email: "",
      message: ""
    },
    errors: {}
  };
  inputStyle = {
    padding: "12px 20px",
    margin: "8px 0",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box"
  };

  handleOnChange = (e, type) => {
    this.setState({formData: {...this.state.formData, [type]: e.target.value}})
  };

  handleValidation = () => {
    let formValid = true;
    let errors = {};
    const {formData} = this.state;
    Object.keys(formData).map((key) => {
      if (!formData[key] || !(formData[key].length > 0)) {
        formValid = false;
        errors[key] = "Cannot be empty"
      }
      if (typeof formData[key] !== 'undefined') {
        if (key === 'name') {
          if (!formData[key].match(/^[a-zA-Z ]+$/) && formData[key].length > 0) {
            formValid = false;
            errors[key] = "Only Alphabets allowed"
          }

          if (formData[key].length > 24) {
            formValid = false;
            errors[key] = "Cannot be longer than 24 Characters"
          }

        }
        if (key === 'email') {
          if (!formData[key].match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            formValid = false;
            errors[key] = "enter valid email id"
          }
        }
      }
      this.setState({errors});
      console.log("validation", formValid, errors, this.state.errors);
    });
    return formValid
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.handleValidation) this.props.sendContactUsInfo(this.state.formData)
  };

  renderRightContent() {
    const {errors, formData} = this.state;
    return (
        <div className="card-content">
          <div style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
            <div className="orange-text text-lighten-1" style={{maxWidth: "50%"}}><i
                className="fas fa-building"/> FeedBuzz
              Cooperation Pvt. Ltd. Sharda
              University, Uttar Pradesh
              201310
            </div>
            <div>
              <div className="orange-text text-lighten-1"><i className="fas fa-phone-alt"/> +91 9865498787</div>
              <div className="orange-text text-lighten-1"><i className="fas fa-envelope"/> support@feedbuzz.com</div>
            </div>
          </div>
          <form style={{padding: "0 10px"}} onSubmit={(e) => this.handleSubmit(e)}>
            <input type="text" name="name" style={this.inputStyle} className="form-control"
                   placeholder="Enter Your Name"
                   onChange={(e) => this.handleOnChange(e, "name")} value={formData.name}/>
            {errors['name'] ? (<label htmlFor="name" className="right red-text text-capitalize"><i
                class="fas fa-exclamation-circle"/> {errors['name']}</label>) : ""}
            <input type="email" style={this.inputStyle} className="form-control" name="email"
                   placeholder="Enter Your Email ID" onChange={(e) => this.handleOnChange(e, "email")}
                   value={formData.email}/>
            {errors['email'] ? (<label htmlFor="email" className="right red-text text-capitalize"><i
                class="fas fa-exclamation-circle"/> {errors['email']}</label>) : ""}
            <textarea className="form-control" name="message" id="" cols="30" rows="10"
                      placeholder="Please Type Your Message" onChange={(e) => this.handleOnChange(e, "message")}
                      value={formData.message}/>
            {errors['message'] ? (<label htmlFor="message" className="right red-text text-capitalize"><i
                class="fas fa-exclamation-circle"/> {errors['message']}</label>) : ""}
            <button className="btn btn-block waves-effect waves-light" style={{marginTop: "10px"}}>Submit</button>
          </form>
        </div>
    )
  }

  render() {
    return (
        <div className="container">
          <div className="card">
            <h3 className="center text-uppercase" style={{color: "#FF8F00"}}>Contact Us</h3>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
              <div style={{padding: "10px"}}><Illus1/></div>
              <div style={{width: "100%"}}>{this.renderRightContent()}</div>
            </div>
          </div>
        </div>
    );
  }
}


export default connect(null, {sendContactUsInfo})(ContactUsPage)


import React, {Component} from 'react';
import {Field, reduxForm} from "redux-form";
import SurveyField from "./SurveyField";
import _ from "lodash";
import {Link} from "react-router-dom";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";
import {SurveyFormFillIllus} from "../../resources/survey_form_illus_svg";


class SurveyForm extends Component {
  renderField() {
    return _.map(formFields, (field) => {
      return <Field
          key={field.name}
          component={SurveyField}
          type={"text"}
          label={field.label}
          name={field.name}
      />
    })
  }

  render() {
    return (
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          <div style={{display: "flex", justifyContents: "space-between"}}>
            <div style={{width: "55%"}}>
              {this.renderField()}
            </div>
            <div style={{
              display: "flex",
              flexDirection: "column",
              width: "45%",
              justifyContent: "space-between",
              alignItems: "center",
              marginLeft: "1rem"
            }}>
              <SurveyFormFillIllus/>
              <div style={{display: "flex", justifyContent: "space-evenly", width: "100%"}}>
                <Link to={'/surveys'} className='red waves-effect waves-light btn-flat white-text red'>Cancel</Link>
                <button type='submit' className='teal waves-effect waves-light btn-flat right white-text'>
                  <i className='material-icons left'>done</i>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
    );
  }
}

/*\
*     display: flex;
    flex-direction: column;
    width: 45%;
    justify-content: center;
    align-items: center;
}

*/
function validate(values) {
  const errors = {};
  _.each(formFields, ({name, label}) => {
    errors.recipients = validateEmails(values.recipients || '');
    if (!values[name]) {
      // if (name === 'recipients') {
      //   errors[name] = `Please provide ',' separated correct Email IDs in correct format`
      /*} else*/
      errors[name] = `Please provide a correct ${label}`
      // }
    }
  });
  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);

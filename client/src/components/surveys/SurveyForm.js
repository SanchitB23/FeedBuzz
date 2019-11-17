import React, {Component} from 'react';
import {Field, reduxForm} from "redux-form";
import SurveyField from "./SurveyField";
import _ from "lodash";
import {Link} from "react-router-dom";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";


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
        <div>
          <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
            {this.renderField()}
            <Link to={'/surveys'} className='red btn-flat white-text red'>Cancel</Link>
            <button type='submit' className='teal btn-flat right white-text'>
              <i className='material-icons left'>done</i>
              Submit
            </button>
          </form>
        </div>
    );
  }
}

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

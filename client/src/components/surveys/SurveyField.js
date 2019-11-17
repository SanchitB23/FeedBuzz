/*
* Contains Logic to render single label / field
*/
import React from 'react';

function SurveyField({input, label, meta}) {
  return (
      <div>
        <label>{label}</label>
        <input {...input} style={{marginBottom: '5px'}}/>
        <div className="red-text" style={{marginBottom: '20px'}}>{meta.touched && meta.error}</div>
      </div>
  );
}

export default SurveyField;

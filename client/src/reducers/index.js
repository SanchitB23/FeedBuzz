import {combineReducers} from "redux";
import auth from "./authReducer";
import {reducer as formReducer} from "redux-form";
import surveys from "./surveysReducer";
import surveyDetails from "./surveyDetailsReducer";
import contactUsData from './ContactUsReducer';

export default combineReducers({
  auth,
  form: formReducer,
  surveys,
  surveyDetails,
  contactUsData
})

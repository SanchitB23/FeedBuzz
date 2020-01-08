import {combineReducers} from "redux";
import auth from "./authReducer";
import {reducer as formReducer} from "redux-form";
import surveys from "./surveyReducer";

export default combineReducers({
  auth,
  form: formReducer,
  surveys
})

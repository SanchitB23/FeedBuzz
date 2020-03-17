import axios from 'axios'
import {FETCH_CONTACT_US_DATA, FETCH_SURVEY_DETAILS, FETCH_SURVEYS, FETCH_USER} from "../utils/actionTypes";

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/current_user');
  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};

export const handleToken = (token) => async dispatch => {
  const res = await axios.post('/api/stripe', token);
  dispatch({type: FETCH_USER, payload: res.data})
};

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);
  history.push('/surveys');
  dispatch({type: FETCH_USER, payload: res.data})
};

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');
  dispatch({type: FETCH_SURVEYS, payload: res.data})
};

export const fetchSurvey = (surveyId) => async (dispatch) => {
  const result = await axios.post('/api/survey-detail', {surveyId});
  dispatch({type: FETCH_SURVEY_DETAILS, payload: result.data})
};

export const deleteSurvey = (surveyId) => async (dispatch) => {
  const result = await axios.post('/api/survey-delete', {surveyId});
  // console.log(result);
  const res = await axios.get('/api/surveys');
  dispatch({type: FETCH_SURVEYS, payload: res.data})
};

export const updateUserInfo = data => async dispatch => {
  console.log("Actions,user info data", data);
  const res = await axios.post('/api/update_user_data', data);
  console.log("actions,user info res", res);
  dispatch({type: FETCH_USER, payload: res.data})
};

export const sendContactUsInfo = data => async dispatch => {
  console.log("Contact Us TEst", data);
  await axios.post('/api/contact-us', data);
};

export const getContactUsInfo = () => async dispatch => {
  const res = await axios.get('/api/contact-us');
  console.log("get Contact actions res", res);
  dispatch({type: FETCH_CONTACT_US_DATA, payload: res.data})
};

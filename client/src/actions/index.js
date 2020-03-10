import axios from 'axios'
import {FETCH_SURVEY_DETAILS, FETCH_SURVEYS, FETCH_USER} from "../utils/actionTypes";

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
/*
export const fetchUser = () => {
  return function (dispatch) {

    axios.get('/api/current_user').then(
        res =>
            dispatch({
              type: FETCH_USER,
              payload: res
            })
    )
  };
};
*/

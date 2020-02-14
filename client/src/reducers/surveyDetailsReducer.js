import {FETCH_SURVEY_DETAILS} from "../utils/actionTypes";

export default function (state = [], action) {
  if (action.type === FETCH_SURVEY_DETAILS) {
    return action.payload;
  } else {
    return state
  }
}

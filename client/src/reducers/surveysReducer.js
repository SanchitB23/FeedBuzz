import {FETCH_SURVEYS} from "../utils/actionTypes";

export default function (state = [], action) {
  if (action.type === FETCH_SURVEYS) {
    return action.payload;
  } else {
    return state
  }
}

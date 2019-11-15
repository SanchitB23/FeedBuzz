import {FETCH_USER} from "../actions/types";

export default function (state = null, {type, payload}) {
  if (type === FETCH_USER) {
    console.log(payload);
    return payload || false;
  } else {
    return state
  }
}

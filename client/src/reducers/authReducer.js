import {FETCH_USER} from "../actions/types";

export default function (state = null, {type, payload}) {
  switch (type) {
    case FETCH_USER:
      return payload.data || false;
    default:
      return state
  }
}

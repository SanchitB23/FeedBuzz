import {FETCH_CONTACT_US_DATA} from "../utils/actionTypes";

export default function (state = [], {type, payload}) {
  if (type === FETCH_CONTACT_US_DATA) return payload;
  else return state
}

import axios from 'axios'
import {FETCH_USER} from "./types";

export const fetchUser = () => async (dispatch) =>
    dispatch({
      type: FETCH_USER,
      payload: await axios.get('/api/current_user')
    });

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

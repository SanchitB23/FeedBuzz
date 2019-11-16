import React from "react";
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import reduxThunk from "redux-thunk";

import 'materialize-css/dist/css/materialize.min.css'

import App from "./components/App";
import reducers from "./reducers";
//temp only for dev mode
import axios from "axios";

window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.querySelector('#root')
);

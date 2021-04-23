import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import App from "./components/App";
import reducers from "./reducers";

import { authInit } from "./auth/actions";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

const store = createStore(reducers, composedEnhancer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);

// Initialise authentication
store.dispatch(authInit());

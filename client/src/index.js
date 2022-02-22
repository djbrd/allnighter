import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { save, load } from "redux-localstorage-simple";

import App from "./components/App";
import reducers from "./reducers";

import { authInit } from "./auth/actions";
import { contentInit } from "./books/actions";
import { injectStore } from "./utils/api";

const composedEnhancer = composeWithDevTools(
  applyMiddleware(
    thunkMiddleware,
    save({ states: ["reading"], debounce: 1000 })
  )
);
const store = createStore(
  reducers,
  load({ states: ["reading"] }),
  composedEnhancer
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);

// Initialise authentication
store.dispatch(authInit());
store.dispatch(contentInit());
injectStore(store);

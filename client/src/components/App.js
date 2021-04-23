import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./Header";
import Welcome from "./Welcome";
import Feature from "./Feature";
import SignIn from "../auth/components/SignIn";
import SignUp from "../auth/components/SignUp";
import SignOut from "../auth/components/SignOut";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={Welcome} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signout" component={SignOut} />
          <Route path="/feature" component={Feature} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;

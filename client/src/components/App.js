import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import theme from "../theme.js";

import Header from "./Header";
import Welcome from "./Welcome";
import Feature from "./Feature";
import Chapter from "./Chapter";
import SignIn from "../auth/components/SignIn";
import SignUp from "../auth/components/SignUp";
import SignOut from "../auth/components/SignOut";
import ChapterUpload from "./ChapterUpload";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <Switch>
            <Route path="/" exact component={Welcome} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signout" component={SignOut} />
            <Route path="/feature" component={Feature} />
            <Route path="/chapter" component={Chapter} />
            <Route path="/chapterupload" component={ChapterUpload} />
          </Switch>
        </MuiThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;

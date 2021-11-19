import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../theme.js";

import Header from "./Header";
import Books from "../books/components/Books";
import ChapterDisplay from "../books/components/ChapterDisplay";
import ChapterBreath from "../books/components/ChapterBreath";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <Switch>
            <Route path="/content" component={Books} />
            <Route path="/chapter/:chapterId" component={ChapterDisplay} />
            <Route path="/chapterbreath/:chapterId" component={ChapterBreath} />
          </Switch>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;

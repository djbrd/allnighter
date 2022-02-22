import React from "react";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../theme.js";

import Books from "../books/components/Books";
import Content from "../books/components/Content";
import ChapterAudio from "../books/components/ChapterAudio";
import ChapterSync from "../books/components/ChapterSync";
import ChapterBreath from "../books/components/ChapterBreath";
import AuthPage from "../auth/components/AuthPage.js";
import AdminOutlet from "../auth/components/AdminOutlet.js";

import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const NoMatch = () => {
  return <p>Page not found</p>;
};

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* <Header /> */}
          <Routes>
            <Route index element={<Content />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route element={<Layout />}>
              <Route path="/chapter/:chapterId" element={<ChapterAudio />} />
              <Route path="admin" element={<AdminOutlet />}>
                <Route index element={<Books />} />
                <Route
                  path="chaptersync/:chapterId"
                  element={<ChapterSync />}
                />
                <Route
                  path="chapterbreath/:chapterId"
                  element={<ChapterBreath />}
                />
              </Route>
            </Route>
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;

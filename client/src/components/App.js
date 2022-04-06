import React from "react";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../theme.js";

import Header from "./Header";
import Content from "../books/components/Content";
import ContactForm from "../meta/components/ContactForm.js";
import CopyAccessForm from "../meta/components/CopyAccessForm.js";
import SharingPage from "../meta/components/SharingPage.js";
import ChapterAudio from "../books/components/ChapterAudio";

// import ContentButton from "../meta/components/ContentButton.js";

import AdminOutlet from "../auth/components/AdminOutlet.js";
import Books from "../books/components/admin/Books";
import ChapterSync from "../books/components/admin/ChapterSync";
import ChapterBreath from "../books/components/admin/ChapterBreath";

import AuthPage from "../auth/components/AuthPage.js";

const HeaderLayout = () => {
  return (
    <>
      {/* <ContentButton /> */}
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
          <Routes>
            <Route index element={<Content />} />
            <Route element={<HeaderLayout />}>
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/:partIdx/:chapterIdx" element={<ChapterAudio />} />
              <Route path="/contact" element={<ContactForm />} />
              <Route path="/copyaccess" element={<CopyAccessForm />} />
              <Route path="/sharing" element={<SharingPage />} />
              <Route path="admin" element={<AdminOutlet />}>
                <Route index element={<Books />} />
                <Route
                  path="chaptersync/:partIdx/:chapterIdx"
                  element={<ChapterSync />}
                />
                <Route
                  path="chapterbreath/:partIdx/:chapterIdx"
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

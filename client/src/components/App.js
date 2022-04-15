import React from "react";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import theme from "../theme.js";

import Header from "./Header";
import Page from "../common/components/Page";
import Contents from "../books/components/Contents";
import ContactForm from "../meta/components/ContactForm.js";
import CopyForm from "../meta/components/CopyForm.js";
import AccessForm from "../meta/components/AccessForm.js";
import ChapterAudio from "../books/components/ChapterAudio";
import BackCover from "../books/components/BackCover.js";
import Epigraphs from "../books/components/Epigraphs.js";
import AdminOutlet from "../auth/components/AdminOutlet.js";
import Books from "../books/components/admin/Books";
import ChapterSync from "../books/components/admin/ChapterSync";
import ChapterBreath from "../books/components/admin/ChapterBreath";

import AuthPage from "../auth/components/AuthPage.js";
import { Typography } from "@material-ui/core";

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
  return (
    <Page>
      <Typography align="center">Page not found</Typography>
    </Page>
  );
};

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <Routes>
            <Route index element={<Contents />} />
            <Route element={<HeaderLayout />}>
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/:partIdx/:chapterIdx" element={<ChapterAudio />} />
              <Route path="/epigraphs" element={<Epigraphs />} />
              <Route path="/backcover" element={<BackCover />} />
              <Route path="/contact" element={<ContactForm />} />
              <Route path="/copy" element={<CopyForm />} />
              <Route path="/access" element={<AccessForm />} />
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
              <Route path="*" element={<NoMatch />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;

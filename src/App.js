import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ConduitLayoutHeader from "./conduit-layout-header";
import ConduitLayoutFooter from "./conduit-layout-footer";

import ConduitPagesHome from "./conduit-pages-home";
import { fetchArticles } from "./fetchArticles.http";
import { fetchTags } from "./fetchTags.http";

import {
  init,
  onFeedSelected,
  onTagSelected,
  onPageSelected,
} from "./conduit-pages-home/service";

function App() {
  return (
    <div>
      <ConduitLayoutHeader />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ConduitPagesHome
                init={init({
                  fetchArticles: fetchArticles(),
                  fetchTags: fetchTags(),
                })}
                onFeedSelected={onFeedSelected}
                onTagSelected={onTagSelected}
                onPageSelected={onPageSelected}
              />
            }
          />
          <Route path="/logout" element={<Navigate replace to="/" />} />
        </Routes>
      </BrowserRouter>

      <ConduitLayoutFooter />
    </div>
  );
}

export default App;

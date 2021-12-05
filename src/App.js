import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ConduitLayoutHeader from "./conduit-layout-header";
import ConduitLayoutFooter from "./conduit-layout-footer";
import ConduitPagesHome from "./conduit-pages-home";

function App() {
  return (
    <div>
      <ConduitLayoutHeader />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ConduitPagesHome />}>
            
          </Route>
        </Routes>
      </BrowserRouter>

      <ConduitLayoutFooter />
    </div>
  );
}

export default App;

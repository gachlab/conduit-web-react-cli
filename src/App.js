import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import ConduitLayoutHeader from "./conduit-layout-header";
import ConduitLayoutFooter from "./conduit-layout-footer";
import ConduitHomePage from "./conduit-home-page";

function App() {
  return (
    <div>
      <ConduitLayoutHeader />
      <Router>
        <Route path="/">
          <ConduitHomePage />
        </Route>
      </Router>
      <ConduitLayoutFooter />
    </div>
  );
}

export default App;

import React from "react";
import { default as ConduitHeader } from "./ConduitHeader";
import { default as ConduitFooter } from "./ConduitFooter";
import { default as Home } from "./Home";

import { BrowserRouter as Router, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <ConduitHeader />
      <Router>
        <Route path="/">
          <Home />
        </Route>
      </Router>
      <ConduitFooter />
    </div>
  );
}

export default App;

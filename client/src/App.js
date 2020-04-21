import React from "react";
import Music from "./components/Music";
import Movies from "./components/Movies";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <span>
          <Link to="/">
            <button className="linkhOME">BACK TO HOME>></button>
          </Link>
        </span>
        <Switch>
          <div className="App-header">
            <Route path="/" exact component={Home} />
            <Route path="/music" exact component={Music} />
            <Route path="/movies" exact component={Movies} />
          </div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

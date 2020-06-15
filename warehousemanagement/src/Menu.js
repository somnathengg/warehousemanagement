import React from "react";
import Home from './pages/home';
import About from './pages/about';
import JqxGridComponent from './jqxgrid/jqxgridcomponent'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function Menu() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/home">Home </Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/tables">Tables</Link>
              </li>
              
            </ul>
          </nav>
          {}
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/tables">
            <JqxGridComponent/>
            </Route>
            <Route path="/home">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
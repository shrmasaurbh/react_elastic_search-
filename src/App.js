import React, {Component} from "react";
import { HashRouter as Router } from "react-router-dom";

import {Routes} from "./router/router.js"


class App extends Component {
  render(){
    return (
      <Router >
        <Routes />
      </Router>
    );
  }
}

export default App;

import React, {Component} from "react";
import Home from "./components/Home";
import Register from "./components/Register";
import "./App.css";
import {BrowserRouter as Router, Route, Switch, withRouter} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={withRouter(Home)} />
          <Route exact path="/login" component={withRouter(Register)} />
        </Switch>
      </Router>
    );
  }
}

export default App;

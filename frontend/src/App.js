import React, {Component} from "react";
import Home from "./components/Home";
import Register from "./components/Register";
import "./App.css";
import { BrowserRouter, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PublicRoute restricted={true} component={Register} path="/login" exact />
          <PrivateRoute component={Home} path="/" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

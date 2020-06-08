import React from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import {LOGIN,SIGNUP} from "../utils";

function DisplayedForm(props) {
  if (props.displayed_form === LOGIN){
    return <LoginForm handleLogin={props.handleLogin} message={props.message}/>;
  }
  else if (props.displayed_form === SIGNUP) {
    return <SignupForm handleSignup={props.handleSignup} message={props.message}/>;
  }
  return null;
}

export default DisplayedForm;

import React from "react";
import PropTypes from "prop-types";

class SignupForm extends React.Component {
  state = {
    username: "",
    password: "",
  };

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevstate) => {
      const newState = {...prevstate};
      newState[name] = value;
      return newState;
    });
  };

  render() {
    return (
      // SIGNUP FORM
      // When submitted, calls handle_signup passed in by the parent component (App)
      <div>
        <h4>Sign Up</h4>
        <form onSubmit={(e) => this.props.handleSignup(e, this.state)}>
          <div class="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Enter Username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <small className="form-text text-muted">
              We'll never share your password with anyone else.
            </small>
          </div>
          <button type="submit" className="btn btn-outline-info">
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

export default SignupForm;

SignupForm.propTypes = {
  handleSignup: PropTypes.func.isRequired,
};

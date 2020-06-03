import React from "react";
import PropTypes from "prop-types";

class LoginForm extends React.Component {
  state = {
    username: "",
    password: "",
  };

  // Handles when user types something into the form.
  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  };

  render() {
    return (
      // When submitted, calls handleLogin passed in by parent component (App)
      <div>
        <h4>Sign In</h4>
        <form onSubmit={(e) => {e.preventDefault();
                                this.props.handleLogin(this.state);}}>
          <div className="form-group">
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
          <div>
            <p>{this.props.message}</p>
          </div>
          <button type="submit" className="btn btn-outline-info">
            Sign In
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

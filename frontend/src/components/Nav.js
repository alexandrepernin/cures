import React from "react";
import {LOGIN, SIGNUP} from "../utils";
import {BrowserRouter, Link} from "react-router-dom";

class Nav extends React.Component {
  render() {
    const logged_out_nav = (
      <div>
        {this.props.displayed_form === SIGNUP ? (
          <p>
            Already have an account?
            <BrowserRouter>
              <Link
                to="/login"
                onClick={() => this.props.displayForm(LOGIN)}
                data-testid="signin"
              >
                Sign In
              </Link>
            </BrowserRouter>
          </p>
        ) : (
          <p>
            Don't have an account?
            <BrowserRouter>
              <Link
                to="/login"
                onClick={() => this.props.displayForm(SIGNUP)}
                data-testid="signup"
              >
                Create one
              </Link>
            </BrowserRouter>
          </p>
        )}
      </div>
    );

    const logged_in_nav = (
      <div>
        <a className="btn btn-warning" href="/" data-testid="cure">
          Find some cures!
        </a>
        <div>
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.props.handleLogout}
          >
            Log Out
          </button>
        </div>
      </div>
    );
    return this.props.logged_in ? logged_in_nav : logged_out_nav;
  }
}

export default Nav;

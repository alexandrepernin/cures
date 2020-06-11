import React from "react";
import PropTypes from "prop-types";
import {Link, BrowserRouter} from "react-router-dom";
import {LOGIN, SIGNUP} from "../utils";

class Nav extends React.Component {
  render() {
    const logged_out_nav = (
      <div>
        {this.props.displayed_form === SIGNUP ? (
          <p>
            {" "}
            Already have an account?{" "}
            <a href="#" onClick={() => this.props.displayForm(LOGIN)} data-testid="signin">
              Sign In
            </a>{" "}
          </p>
        ) : (
          <p>
            {" "}
            Don't have an account?{" "}
            <a href="#" onClick={() => this.props.displayForm(SIGNUP)} data-testid="signup">
              Create one
            </a>{" "}
          </p>
        )}
      </div>
    );

    const logged_in_nav = (
      <div>
        <div>
        <BrowserRouter>
          <Link className="btn btn-warning" to="/" data-testid="cure">
            Find some cures!
          </Link>
        </BrowserRouter>
        </div>
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

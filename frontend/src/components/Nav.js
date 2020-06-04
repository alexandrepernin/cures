import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

class Nav extends React.Component {
  render() {
    const logged_out_nav = (
      <div>
        {this.props.displayed_form == "signup" ? (
          <p>
            {" "}
            Already have an account?{" "}
            <a href="#" onClick={() => this.props.displayForm("login")}>
              Sign In
            </a>{" "}
          </p>
        ) : (
          <p>
            {" "}
            Don't have an account?{" "}
            <a href="#" onClick={() => this.props.displayForm("signup")}>
              Create one
            </a>{" "}
          </p>
        )}
      </div>
    );

    const logged_in_nav = (
      <div>
        <div>
          <Link className="btn btn-warning" to="/">
            Find some cures!
          </Link>
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

Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  displayForm: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

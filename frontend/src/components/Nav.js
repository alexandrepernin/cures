import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

function Nav(props) {
  const logged_out_nav = (
    <div>
      <button
        type="button"
        className="btn btn-outline-info"
        onClick={() => props.displayForm("login")}
      >
        Sign In
      </button>
      <p>
        {" "}
        Don't have an account?{" "}
        <a href="#" onClick={() => props.displayForm("signup")}>
          Create one
        </a>{" "}
      </p>
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
        <button type="button" className="btn btn-danger" onClick={props.handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
  return props.logged_in ? logged_in_nav : logged_out_nav;
}

export default Nav;

Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  displayForm: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

import React, {Component} from "react";
import Nav from "./Nav";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import "./Register.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: "login",
      logged_in: localStorage.getItem("token") ? true : false,
      username: null,
      message: null,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  componentDidMount() {
    if (this.state.logged_in) {
      try {
        const path = process.env.REACT_APP_BACKEND_URL.concat("/cures/current_user/");
        fetch(path, {
          headers: {
            Authorization: `JWT ${localStorage.getItem("token")}`,
          },
        })
          .then((res) => res.json())
          .then((json) => {
            this.setState({username: json.username});
          });
      } catch (error) {
        console.log(error);
      }
    }
  }

  // POST request to obtain_jwt_token view.
  async handleLogin(credentials) {
    try {
      const path = process.env.REACT_APP_BACKEND_URL.concat("/token-auth/");
      const res = await fetch(path, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const user_info = await res.json();
      if ("token" in user_info) {
        localStorage.setItem("token", user_info.token);
        localStorage.setItem("username", user_info.user.username);
        this.setState({
          logged_in: true,
          displayed_form: null,
          username: user_info.user.username,
          message: null,
        });
      } else {
        // Case wrong username/password.
        console.log(user_info);
        this.setState({message: "Invalid Credentials."});
      }
    } catch (error) {
      console.log(error);
    }
  }

  // POST request to UserList view => returns User's serialized data and token
  async handleSignup(credentials) {
    try {
      const path = process.env.REACT_APP_BACKEND_URL.concat("/cures/signup/");
      const response = await fetch(path, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const user_info = await response.json();
      if ("token" in user_info) {
        localStorage.setItem("token", user_info.token);
        localStorage.setItem("username", user_info.username);
        this.setState({
          logged_in: true,
          displayed_form: null,
          username: user_info.username,
          message: null,
        });
      } else {
        // Case Username already exists.
        const message = user_info.username;
        this.setState({message: message});
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Logging out: delete token from local storage.
  handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    this.setState({logged_in: false, username: null});
  };

  displayForm = (form) => {
    this.setState({displayed_form: form});
  };

  render() {
    let form;
    switch (this.state.displayed_form) {
      case "login":
        form = <LoginForm handleLogin={this.handleLogin} message={this.state.message} />;
        break;
      case "signup":
        form = (
          <SignupForm handleSignup={this.handleSignup} message={this.state.message} />
        );
        break;
      default:
        form = null;
    }

    return (
      <div className="register-wrapper">
        <h3>{this.state.logged_in ? `Hello, ${this.state.username}` : ""}</h3>
        {form}
        <Nav
          logged_in={this.state.logged_in}
          displayForm={this.displayForm}
          displayed_form={this.state.displayed_form}
          handleLogout={this.handleLogout}
        />
      </div>
    );
  }
}

export default Register;

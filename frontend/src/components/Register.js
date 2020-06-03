import React, {Component} from "react";
import Nav from "./Nav";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import "./Register.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: "",
      logged_in: localStorage.getItem("token") ? true : false,
      username: "",
      message: "",
    };
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
      }
      catch(error) {
        console.log(error);
      }

    }
  }

  // POST request to obtain_jwt_token view.
  handleLogin = (credentials) => {
    try {
      const path = process.env.REACT_APP_BACKEND_URL.concat("/token-auth/");
      fetch(path, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })
        .then(function (res) {
          return res.json();
        })
        .then((user_info) => {
          if ("token" in user_info) {
            localStorage.setItem("token", user_info.token);
            localStorage.setItem("username", user_info.user.username);
            this.setState({
              logged_in: true,
              displayed_form: "",
              username: user_info.user.username,
              message: "",
            });
          } else {
            // Case wrong username/password.
            this.setState({message: "Invalid Credentials."});
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  // POST request to UserList view => returns User's serialized data and token
  handleSignup = (credentials) => {
    try {
      const path = process.env.REACT_APP_BACKEND_URL.concat("/cures/signup/");
      fetch(path, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })
        .then((res) => res.json())
        .then((user_info) => {
          if ("token" in user_info) {
            localStorage.setItem("token", user_info.token);
            localStorage.setItem("username", user_info.username);
            this.setState({
              logged_in: true,
              displayed_form: "",
              username: user_info.username,
              message: "",
            });
          } else {
            // Case Username already exists.
            const message = user_info.username;
            this.setState({message: message});
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

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
        <h3>
          {this.state.logged_in ? `Hello, ${this.state.username}` : "Please Sign In"}
        </h3>
        <Nav
          logged_in={this.state.logged_in}
          displayForm={this.displayForm}
          handleLogout={this.handleLogout}
        />
        {form}
      </div>
    );
  }
}

export default Register;

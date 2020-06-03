import React, {Component} from "react";
import Nav from "./Nav";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: null,
      logged_in: localStorage.getItem("token") ? true : false,
      username: null,
      message: null,
    };
  }

  componentDidMount() {
    if (this.state.logged_in) {
      fetch("http://localhost:8000/cures/current_user/", {
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          this.setState({username: json.username});
        });
    }
  }

  // POST request to obtain_jwt_token view.
  handleLogin = (e, data) => {
    e.preventDefault();
    fetch("http://localhost:8000/token-auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(function (res) {
        return res.json();
      })
      .then((json) => {
        if ("user" in json) {
          localStorage.setItem("token", json.token);
          this.setState({
            logged_in: true,
            displayed_form: "",
            username: json.user.username,
            message: "",
          });
        } else {
          this.setState({message: "Invalid Credentials."});
        }
      });
  };

  // POST request to UserList view => returns User's serialized data and token
  handleSignup = (e, data) => {
    e.preventDefault();
    fetch("http://localhost:8000/cures/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        localStorage.setItem("token", json.token);
        this.setState({
          logged_in: true,
          displayed_form: "",
          username: json.username,
        });
      });
  };

  // Logging out: delete token from local storage.
  handleLogout = () => {
    localStorage.removeItem("token");
    this.setState({logged_in: false, username: ""});
  };

  displayForm = (form) => {
    this.setState({
      displayed_form: form,
    });
  };

  render() {
    let form;
    switch (this.state.displayed_form) {
      case "login":
        form = <LoginForm handleLogin={this.handleLogin} message={this.state.message} />;
        break;
      case "signup":
        form = <SignupForm handleSignup={this.handleSignup} />;
        break;
      default:
        form = null;
    }

    return (
      <div
        className="App"
        style={{
          position: "absolute",
          left: "50%",
          top: "30%",
          transform: "translate(-50%, -50%)",
        }}
      >
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

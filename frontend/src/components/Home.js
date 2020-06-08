import React, {Component} from "react";
import {Col, Row} from "reactstrap";
import SymptomsList from "./SymptomsList";
import Search from "./Search";
import "./Register.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symptoms: [],
    };
    this.handleSearch = this.handleSearch.bind(this);
  }
  async handleSearch(symptom) {
    try {
      const path = process.env.REACT_APP_BACKEND_URL.concat("/api/symptoms/");
      const res = await fetch(path, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(symptom),
      });
      const symptom_info = await res.json();
      //Case no match
      if (symptom_info.message){
        console.log(symptom_info.message);
        this.setState({symptoms: []});
      }
      else {
        this.setState({symptoms: symptom_info});
        console.log(this.state.symptoms);
      }
    }
    catch(error){
      console.log(error);
    }

  }

  handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/login";
  };

  render() {
    return (
      <div className="register-wrapper">
        <Row>
          <Search handleSearch={this.handleSearch} />
        </Row>
        <Row>
          <Col>
            <SymptomsList symptoms={this.state.symptoms} />
          </Col>
        </Row>
        <Row>
          <button type="button" className="btn btn-danger" onClick={this.handleLogout}>
            Log Out
          </button>
        </Row>
      </div>
    );
  }
}

export default Home;

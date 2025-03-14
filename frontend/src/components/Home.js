import React, {Component} from "react";
import {Col, Row} from "reactstrap";
import SymptomsList from "./SymptomsList";
import Search from "./Search";
import "./Register.css";
import {withRouter} from "react-router-dom";
import {execFetch} from "../utils";

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
      const path = `${process.env.REACT_APP_BACKEND_URL}/api/symptoms/`;
      const method = "POST";
      const body = JSON.stringify(symptom);
      const symptom_info = await execFetch(path,method,body);
      //Case no match
      if (symptom_info.message) {
        this.setState({symptoms: []});
      } else {
        this.setState({symptoms: symptom_info});
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    this.props.history.push("/login");
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

export default withRouter(Home);

import React, {Component} from "react";
import {Col, Row} from "reactstrap";
import CuresList from "./CuresList";
import axios from "axios";
import "./Register.css";

class PublicHome extends Component {
  state = {
    cures: [],
  };

  componentDidMount() {
    this.resetState();
  }

  getCures = () => {
    const path = `${process.env.REACT_APP_BACKEND_URL}/api/cures-list/`;
    axios.get(path).then((res) => this.setState({cures: res.data}));
  };

  resetState = () => {
    this.getCures();
  };

  render() {
    return (
      <div className="register-wrapper">
        <Row>
          <Col>
            <CuresList cures={this.state.cures} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default PublicHome;

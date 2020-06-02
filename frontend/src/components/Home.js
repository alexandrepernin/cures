import React, {Component} from "react";
import {Col, Container, Row} from "reactstrap";
import CuresList from "./CuresList";
import axios from "axios";
import {API_URL} from "../constants";

class Home extends Component {
  state = {
    cures: [],
  };

  componentDidMount() {
    this.resetState();
  }

  getCures = () => {
    axios.get(API_URL).then((res) => this.setState({cures: res.data}));
  };

  resetState = () => {
    this.getCures();
  };

  render() {
    return (
      <Container style={{marginTop: "20px"}}>
        <Row>
          <Col>
            <CuresList cures={this.state.cures} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;

import React, {Component} from "react";
import {Col, Container, Row} from "reactstrap";
import CuresList from "./CuresList";
import axios from "axios";

class Home extends Component {
  state = {
    cures: [],
  };

  componentDidMount() {
    this.resetState();
  }

  getCures = () => {
    const path = process.env.REACT_APP_BACKEND_URL.concat("/api/cures/")
    axios.get(path).then((res) => this.setState({cures: res.data}));
  };

  resetState = () => {
    this.getCures();
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.reload();
  };

  render() {
    return (
      <div>
          <Container style={{marginTop: "20px"}}>
              <Row>
                <Col>
                  <CuresList cures={this.state.cures} />
                </Col>
              </Row>
              <Row>
                <button type="button" className="btn btn-danger" onClick={this.handleLogout}>
                  Log Out
                </button>
              </Row>
          </Container>

      </div>

    );
  }
}

export default Home;

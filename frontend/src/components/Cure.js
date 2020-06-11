import React, {Component} from "react";
import RecipesList from "./RecipesList";
import {Col, Row} from "reactstrap";
import "./Register.css";
import {execFetch} from "../utils";

class Cure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      data: null,
    };
    this.handleDetail = this.handleDetail.bind(this);
  }
  componentDidMount() {
    this.resetState();
  }

  async handleDetail(id) {
    const path = `${process.env.REACT_APP_BACKEND_URL}/api/cures/${id}/details/`;
    const method = "GET";
    const cure_info = await execFetch(path, method, null);
    this.setState({data: cure_info.recipes, name: cure_info.name});
  }

  resetState = () => {
    const id = this.props.match.params.id;
    this.handleDetail(id);
  };

  render() {
    return (
      <div className="register-wrapper">
        <Row>
          <Col>
            <RecipesList recipes={this.state.data} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Cure;

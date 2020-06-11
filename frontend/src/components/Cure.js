import React, {Component} from "react";
import RecipesList from "./RecipesList";
import {Col, Row} from "reactstrap";
import "./Register.css";

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
    const path = process.env.REACT_APP_BACKEND_URL.concat("/api/cures/")
      .concat(id)
      .concat("/details/");
    const res = await fetch(path, {
      method: "GET",
      headers: {"Content-Type": "application/json"},
    });
    const cure_info = await res.json();
    this.setState({data: cure_info.recipes, name: cure_info.name});
    console.log(this.state.name);
    console.log(this.state.data);
  }

  resetState = () => {
    let id = this.props.match.params.id;
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

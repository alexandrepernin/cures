import React, {Component} from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

class SymptomsList extends Component {
  render() {
    const symptoms = this.props.symptoms;
    return (
      <div>
        {!symptoms || symptoms.length <= 0 ? (
          <p>No potential match</p>
        ) : (
          symptoms.map((symptom, index) => (
            <div key={index}>
              <p>Did you mean?</p>
              <Card style={{width: "45rem"}}>
                <Card.Body>
                  <Card.Title>{symptom.name}</Card.Title>
                  <Card.Text>{symptom.tags}</Card.Text>
                </Card.Body>
              </Card>
              <Card style={{width: "45rem"}}>
                <Card.Header>Available cures:</Card.Header>
                <ListGroup variant="flush">
                  {symptom.cures.map((value, index) => {
                    let link = "/cures/".concat(value.pk);
                    return (
                      <ListGroup.Item action href={link} key={index}>
                        {index + 1}: {value.name}
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </Card>
            </div>
          ))
        )}
      </div>
    );
  }
}

export default SymptomsList;

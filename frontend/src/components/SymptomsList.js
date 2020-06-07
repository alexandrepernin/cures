import React, {Component} from "react";
import {Table} from "reactstrap";

class SymptomsList extends Component {
  render() {
    const symptoms = this.props.symptoms;
    return (
      <Table>
        <thead>
          <tr>
            <th>Did you mean?</th>
          </tr>
        </thead>
        <tbody>
          {!symptoms || symptoms.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>No potential match</b>
              </td>
            </tr>
          ) : (
            symptoms.map((symptom) => (
              <tr key={symptom.pk}>
                <td>{symptom.name}</td>
                <td>{symptom.cures}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    );
  }
}

export default SymptomsList;

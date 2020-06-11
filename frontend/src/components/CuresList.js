import React, {Component} from "react";
import {Table} from "reactstrap";

class CuresList extends Component {
  render() {
    const cures = this.props.cures;
    return (
      <Table>
        <thead>
          <tr>
            <th>First 10 cures: </th>
          </tr>
        </thead>
        <tbody>
          {!cures || cures.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>Ops, no cure here yet</b>
              </td>
            </tr>
          ) : (
            cures.map((cure) => (
              <tr key={cure.pk}>
                <td>{cure.name}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    );
  }
}

export default CuresList;

import React, {Component} from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

class RecipesList extends Component {
  render() {
    const recipes = this.props.recipes;
    return (
      <div>
        {!recipes || recipes.length <= 0 ? (
          <p>No potential match</p>
        ) : (
          recipes.map((recipe, index) => (
            <div key={index}>
              <Card style={{width: "45rem"}}>
                <Card.Body>
                  <Card.Title>{recipe.name}</Card.Title>
                  <Card.Text>{recipe.ingredients}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))
        )}
      </div>
    );
  }
}

export default RecipesList;

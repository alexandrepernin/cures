import React from "react";

class Search extends React.Component {
  state = {
    search: "",
    symptoms: [],
  };

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({search: value});
  };

  render() {
    return (
      <div>
        <form
          className="form-inline"
          onSubmit={(e) => {
            e.preventDefault();
            this.props.handleSearch(this.state);
          }}
        >
          <div className="form-group mb-2">
            <label className="sr-only">Email</label>
            <input
              type="text"
              readOnly
              className="form-control-plaintext"
              id="staticEmail2"
              value="Symptom"
            />
          </div>
          <div className="form-group mx-sm-3 mb-2">
            <label className="sr-only">e.g. Mal de dent</label>
            <input
              type="text"
              className="form-control"
              id="inputPassword2"
              placeholder="Mal de dent"
              value={this.state.search}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary mb-2">
            Search!
          </button>
        </form>
      </div>
    );
  }
}

export default Search;

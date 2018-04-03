import React, { Component } from "react";

class Printer extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  //This is the base printer object that displays all of the data needed on every printer
  onClick() {
    this.props.deleteFunction(this.props.id);
  }

  render() {
    var printerData = this.props.data;

    return (
      <div className="Printer card card-size">
        <img className="card-img-top" src={require('./../Images/download.jpg')} alt="Card cap"/>
        <div> Status: {printerData['status']} </div>
        <div className="card-block">
          <button className="btn btn-primary card-button">
            {printerData["name"]}
          </button>
          <button
            onClick={this.onClick}
            className="btn btn-outline-secondary card-button"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default Printer;

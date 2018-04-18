import React, { Component } from "react";

class ArchivePage extends Component {
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
      <div className="card card-size ">
        <img
          className="card-img-top"
          src={require("./../Images/download.jpg")}
          alt="Card cap"
        />
        {printerData["name"]}
        <div> Status: {printerData["status"]} </div>
        <div className="card-block">
          <button className="btn btn-primary card-button">Dequeue</button>
          <button
            onClick={this.onClick}
            className="btn btn-outline-danger card-button"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default ArchivePage;

import React, { Component } from "react";

class Printer extends Component {
  //This is the base printer object that displays all of the data needed on every printer
  render() {
    var printerData = this.props.data;
    return (
      <div className="Printer">
        Hello World!
        <button className="btn btn-primary">{printerData['name']}</button>
        <button className="btn btn-primary btn-warning">Delete Printer</button>
      </div>
    );
  }
}

export default Printer;

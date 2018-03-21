import React, { Component } from "react";

class Printer extends Component {
  render() {
    var printerData = this.props.data;
    return (
      <div className="Printer">
        {printerData["file"]}
        <button className="btn">Delete</button>
        <button className="btn">Queue</button>
      </div>
    );
  }
}

export default Printer;

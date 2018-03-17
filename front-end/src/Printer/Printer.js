import React, { Component } from "react";

class Printer extends Component {
  render() {
    var printerData = this.props.data;
    return (
      <div className="Printer">
        Hello World!
        <button>{printerData}</button>
      </div>
    );
  }
}

export default Printer;

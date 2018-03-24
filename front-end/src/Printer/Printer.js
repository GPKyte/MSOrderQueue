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
      <div className="Printer">
        <button className="btn btn-primary">{printerData["name"]}</button>
        <button onClick={this.onClick} className="btn btn-primary btn-outline-secondary">
          Delete Printer
        </button>
      </div>

    );
  }
}

export default Printer;

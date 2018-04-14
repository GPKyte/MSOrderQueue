import React, { Component } from "react";

class File extends Component {
  render() {
    var printerData = this.props.data;
    return (
      <div className="Printer">
        {/* This is the base printer Object that displays all the nessicary for the future releases. */}
        {printerData["fileName"]}
        <div />
        <button
          id={printerData["id"]}
          className="btn btn-primary btn-sm disabled"
          aria-disabled="true"
        >
          Delete
        </button>
        <button
          className="btn btn-secondary btn-sm disabled"
          aria-disabled="true"
        >
          Queue
        </button>
      </div>
    );
  }
}

export default File;

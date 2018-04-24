import React, { Component } from "react";

class File extends Component {
  render() {
    var sidebarRequestFile = this.props.data;
    return (
      <div className="File">
        {/* This is the base printer Object that displays all the nessicary for the future releases. */}
        {sidebarRequestFile["fileName"]}
        <div />
        <button
          className="btn btn-primary btn-sm disabled"
          aria-disabled="true"
        >
          Delete
        </button>
        <button
          className="btn btn-secondary btn-sm disabled"
          aria-disabled="true"
        >
          Print
        </button>
      </div>
    );
  }
}

export default File;

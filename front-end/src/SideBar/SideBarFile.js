import React, { Component } from "react";

class File extends Component {
  render() {
    var sidebarRequestFile = this.props.data;
    var file = sidebarRequestFile["fileName"];
    return (
      <div className="file">
        <div className="left">{file.indexOf("thingiverse") !== -1 ?
          <a href={file} target="_blank">Thingiverse</a> : file}</div>
          <div className="right">{sidebarRequestFile["color"]} {sidebarRequestFile["completed"]}/{sidebarRequestFile["qty"]}</div>
      </div>
    );
  }
}

export default File;

import React, { Component } from "react";
import SideBarFile from "./SideBarFile";

class SideBarJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: true
    };
  }

  unHide() {
    var tempVar = this.props.elementID;
    this.props.currentIndex(tempVar);
    this.setState = {
      isHidden: false
    }
  }

  render() {
    var job = this.props.data;
    return (
      <div className="Printer">
        {job["email"]} {job["firstName"]}
        <div />
        <button onClick={this.unHide.bind(this)}>
          {this.props.elementID}
        </button>
        {!this.state.isHidden && <FullList data={job} />}
      </div>
    );
  }
}

class FullList extends Component {
  render() {
    var size = 0;
    var requests = this.props.data['requests'][0];
    return (
      <ul className="PrinterContainer">
        {requests['files'].map(i => {
          size += 1;
          return <SideBarFile key={size - 1} elementID={size - 1} data={i} />;
        })}
      </ul>
    );
  }
}

export default SideBarJob;

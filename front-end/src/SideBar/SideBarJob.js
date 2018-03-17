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
    this.setState({ isHidden: false });
  }

  hide() {
    this.setState({ isHidden: true });
  }

  onClick() {
    this.props.onClick(this.props.elementID);
    if (this.state.isHidden) {
      this.unHide();
      this.props.onClick(this.props.elementID);
    } else {
      this.hide();
      this.props.onClick(-1);
    }
  }

  render() {
    var job = this.props.data;
    var selected = this.props.selected;

    //The isHidden checks for wether or not the current list should be shown
    //The selected is the current index of what should be shown
    //The element id is the current index of the component that we are on
    return (
      <div className="Printer">
        {job["email"]} {job["firstName"]}
        <div />
        <button onClick={this.onClick.bind(this)}>
          {this.props.elementID}
        </button>
        {!this.state.isHidden &&
          selected === this.props.elementID && <FullList data={job} />}
      </div>
    );
  }
}

class FullList extends Component {
  render() {
    var size = 0;
    var requests = this.props.data["requests"][0];
    return (
      <ul className="PrinterContainer">
        {requests["files"].map(i => {
          size += 1;
          return <SideBarFile key={size - 1} elementID={size - 1} data={i} />;
        })}
      </ul>
    );
  }
}

export default SideBarJob;

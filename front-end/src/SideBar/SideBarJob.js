import React, { Component } from "react";
import SideBarFile from "./SideBarFile";

class SideBarJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: true,
      buttonProperty: "btn btn-primary",
      printerProperty: "Printer list-group-item",
      listProperty: "collapse",
      currentIndex: -1
    };
  }

  //Responsible for showing all of the files that are inside the job

  //Responsible for hiding all of the files that are inside the job

  //Responible for the logic behind hiding and showing the items in the job
  onClick() {
    this.props.changeSelectedIndex(this.props.index);
    console.log(this.props.index, this.props.selected);
  }



  render() {
    var job = this.props.data;
    var selected = this.props.selected;

    //The isHidden checks for wether or not the current list should be shown
    //The selected is the current index of what should be shown
    //The element id is the current index of the component that we are on
    return (
      <div className={this.state.printerProperty}>
        <div className="panel-group">
          {job["email"]} {job["firstName"]}
          <button
            className={this.state.buttonProperty}
            onClick={this.onClick.bind(this)}
          >
            {this.props.index}
          </button>
          {selected === this.props.index && (
            <FullList className={this.state.listProperty} data={job} />
          )}
          <button className="btn btn-outline-primary btn-lg">Delete</button>

        </div>
      </div>
    );
  }
}

class FullList extends Component {
  //This is the generated list responsible for holding all of the files that we are using.
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

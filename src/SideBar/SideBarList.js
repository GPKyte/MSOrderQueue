import React, { Component } from "react";
import SideBarJob from "./SideBarJob.js";

class SideBarList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: -1
    };
  }

  selectedList(number, id) {
    var flag = false;
    if (number === id) {
      flag = !flag;
    }
    return flag;
  }

  changeSelectedIndex(value) {
    this.selectedIndex = value;
  }

  render() {
    var size = 0;
    //This is the list of jobs that are in the queue
    var ListOfJobs = this.props.data;

    var list = ListOfJobs.map(i => {
      size += 1;
      return (
        <SideBarJob
          currentIndex={this.changeSelectedIndex}
          selected={this.selectedList}
          key={size - 1}
          elementID={size - 1}
          data={i}
        />
      );
    });

    //If there are Jobs in the queue then render this
    if (ListOfJobs != null) {
      return (
        <div>
          <ul className="PrinterContainer">{list}</ul>
        </div>
      );
    } else {
      return <div>There are no Jobs</div>;
    }
  }
}

export default SideBarList;

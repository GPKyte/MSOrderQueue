import React, { Component } from "react";
import SideBarJob from "./SideBarJob.js";
var Promise = require("bluebird");
Promise.promisifyAll(require("request"));

class SideBarList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: -1,
      jobList: []
    };
  }

  //Part of the logic to see which of the jobs is currenty expanded.
  onClick(index) {
    this.setState({
      selectedIndex: index
    });
  }

  jobList() {
    //  fetch('http://localhost:8080/api/jobList')
    // .then(({ results }) => this.setState({ jobList: results.blob() }));
    // console.log
  }

  componentDidMount() {
    this.jobList();
  }

  render() {
    var size = 0;
    //This is the list of jobs that are in the queue
    var ListOfJobs = this.props.data;

    //If there are Jobs in the queue then render this
    if (ListOfJobs != null) {
      //This is the generated list that we will use to populate all of the jobs that are inside of the sidebar.
      var list = ListOfJobs.map(i => {
        size += 1;
        return (
          <SideBarJob
            onClick={this.onClick.bind(this)}
            currentIndex={this.changeSelectedIndex}
            selected={this.state.selectedIndex}
            key={i.id}
            currentlyRevealed={this.state.selectedIndex}
            elementID={size - 1}
            data={i}
          />
        );
      });
      return <div>{list}</div>;
    } else {
      return <div>There are no Jobs</div>;
    }
  }
}

export default SideBarList;

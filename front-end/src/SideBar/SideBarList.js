import React, { Component } from "react";
import SideBarJob from "./SideBarJob.js";
var Promise = require("bluebird")
Promise.promisifyAll(require("request"));

class SideBarList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: "",
      jobList: []
    };
    this.changeSelectedIndex = this.changeSelectedIndex.bind(this);
  }

  //Part of the logic to see which of the jobs is currenty expanded.
  onClick(index) {
    this.setState({
      selectedIndex: index

    });
    console.log(this.state.selectedIndex)
  }

  changeSelectedIndex(index) {
    this.setState({
      selectedIndex: index
    })
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
    //This is the list of jobs that are in the queue
    var ListOfJobs = this.props.data;



    //If there are Jobs in the queue then render this
    if (ListOfJobs != null) {
      //This is the generated list that we will use to populate all of the jobs that are inside of the sidebar.
      var list = ListOfJobs.map(i => {
        return (
          <SideBarJob
            onClick={this.onClick.bind(this)}
            index={i.id}
            currentIndex={this.changeSelectedIndex}
            selected={this.state.selectedIndex}
            key={i.id}
            currentlyRevealed={this.state.selectedIndex}
            data={i}
          />
        );
      });
      return (
          <div>{list}</div>
      );
    } else {
      return <div>There are no Jobs</div>;
    }
  }
}

export default SideBarList;

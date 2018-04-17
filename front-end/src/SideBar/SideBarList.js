import React, { Component } from "react";
import SideBarrequest from "./SideBarJob.js";
var Promise = require("bluebird");
Promise.promisifyAll(require("request"));

class SideBarList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: -1,
      requestList: []
    };
  }

  //Part of the logic to see which of the requests is currenty expanded.
  onClick(index) {
    this.setState({
      selectedIndex: index
    });
  }

  requestList() {
    fetch(this.props.url + "/api/requests").then(results => {
      if (results.status === 200) {
        console.log(results);
        results
          .json()
          .then(data => ({
            data: data,
            status: results.status
          }))
          .then(results => {
            this.setState({
              requestList: results["data"]
            });
            console.log(this.state.requestList);
          });
      } else {
        throw new Error("This project SUCKS!");
      }
    });
  }

  componentDidMount() {
    this.requestList();
  }

  render() {
    var size = 0;
    //If there are requests in the queue then render this
    if (this.state.requestList != null) {
      //This is the generated list that we will use to populate all of the requests that are inside of the sidebar.
      var list = this.state.requestList.map(i => {
        size += 1;
        return (
          <nav key={i["id"]} id="sidebar" className="wrapper">
            <div className="sidebar-header">
              <h3>Jobs</h3>
            </div>
            <SideBarrequest
              onClick={this.onClick.bind(this)}
              currentIndex={this.changeSelectedIndex}
              selected={this.state.selectedIndex}
              key={i.id}
              currentlyRevealed={this.state.selectedIndex}
              elementID={size - 1}
              data={i}
            />
          </nav>
        );
      });
      return <div>{list}</div>;
    } else {
      return <div>There are no requests</div>;
    }
  }
}

export default SideBarList;

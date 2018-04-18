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
    this.deleteRequest = this.deleteRequest.bind(this);

  }

  //Part of the logic to see which of the requests is currenty expanded.
  onClick(index) {
    this.setState({
      selectedIndex: index
    });
  }

  deleteRequest(path,id) {
    const headersI = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "True"
    };

    const myRequest = new Request(this.props.url + ":8080/api/requests/" + id, {
      method: "DELETE",
      headers: headersI
    });

    fetch(myRequest).then(response => {
      this.requestList();
    });
  }


  requestList() {
    fetch(this.props.url + "/api/queue").then(results => {
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
        throw new Error("Server No Longer Has Has The File");
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
          <nav key={i["id"]} >
            <SideBarrequest
              onClick={this.onClick.bind(this)}
              currentIndex={this.changeSelectedIndex}
              selected={this.state.selectedIndex}
              deleteRequest={this.deleteRequest}
              currentlyRevealed={this.state.selectedIndex}
              elementID={size - 1}
              data={i}
            />
          </nav>
        );
      });
    }
    return (
      <div id="sidebar" className="wrapper">
        <div className="sidebar-header">
          <h3>Jobs</h3>
        </div>
        {list}
      </div>
    );
  }
}

export default SideBarList;

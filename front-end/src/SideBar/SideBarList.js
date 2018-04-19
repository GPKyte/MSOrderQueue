import React, { Component } from "react";
import SideBarrequest from "./SideBarJob.js";
var Promise = require("bluebird");
Promise.promisifyAll(require("request"));

class SideBarList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: -1
    };
  }

  //Part of the logic to see which of the requests is currenty expanded.
  onClick(index) {
    this.setState({
      selectedIndex: index
    });
  }

  render() {
    var size = 0;
    var requests = this.props.requests;
    var printers = this.props.printers;
    //If there are requests in the queue then render this
    if (requests != null) {
      //This is the generated list that we will use to populate all of the requests that are inside of the sidebar.
      console.log(requests)
      if (requests.length > 0) {
        var list = requests.map(i => {
          size += 1;
          return (
            <nav key={i["id"]}>
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

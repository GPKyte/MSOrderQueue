import React, { Component } from "react";
import SideBarFile from "./SideBarFile";

class SideBarrequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: true,
      buttonProperty: "btn btn-primary",
      printerProperty: "Printer list-group-item",
      popupVisable: true
    };
    this.onDelete = this.onDelete.bind(this);
  }

  //Responible for the logic behind hiding and showing the items in the request
  onClick() {
    this.props.onClick(this.props.elementID);
    if (!(this.props.selected === this.props.elementID)) {
      this.props.onClick(this.props.elementID);
    } else {
      this.props.onClick(-1);
    }
  }
  onDelete(event) {
    //TODO fix this please
    console.log(event.target);
    this.props.deleteRequest(this.props.url, this.props.data["id"]);
  }

  render() {
    var request = this.props.data;
    var selected = this.props.selected;
    var expanded = false;

    if (selected === this.props.elementID) {
      expanded = true;
    }

    //The isHidden checks for wether or not the current list should be shown
    //The selected is the current index of what should be shown
    //The element id is the current index of the component that we are on
    //Add the popup later with inserting this {this.state.popupVisable && (<QueuePopup printers={printers}></QueuePopup>)}
    return (
      <div className="list-group-item">
        <button className="btn-close" onClick={this.onDelete}>X</button>
        <div className="panel-group">
          <div className="wrap-emails" onClick={this.onClick.bind(this)}>
            {" "}
            {request["user"]}{" "}
          </div>
          {request["firstName"]}
          <div />
          {expanded && (
            <FullList className={this.state.listProperty} data={request} />
          )}
        </div>
      </div>
    );
  }
}

class FullList extends Component {
  //This is the generated list responsible for holding all of the files that we are using.
  render() {
    var size = 0;
    var requests = this.props.data["requestItems"];
    return (
      <ul className="list-group list-group-flush">
        {requests.map(i => {
          size += 1;
          return <SideBarFile key={size - 1} elementID={size - 1} data={i} />;
        })}
      </ul>
    );
  }
}

export default SideBarrequest;

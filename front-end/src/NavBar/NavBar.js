import React, { Component } from "react";

class NavBar extends Component {
  constructor(props) {
    super(props);

  }

  //This is the base printer object that displays all of the data needed on every printer
  onClick() {
  }

  render() {
    var printerData = this.props.data;

    return (
      <div className="">
        <button>Printers</button>
        <button>Login</button>
        <button>Archive</button>
      </div>
    );
  }
}

export default NavBar;

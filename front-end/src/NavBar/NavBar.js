import React, { Component } from "react";

import MakePrinter from "./../Make Printers/MakePrinters.js";
import PrinterList from "./../Printer/PrinterList.js";
import LoginPage from "./../LoginPage/LoginPage.js";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: "printers"
    };
    this.onClick = this.onClick.bind(this);
  }

  //This is the base printer object that displays all of the data needed on every printer
  onClick(event) {
    if (event.target.name != null) {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  render() {
    var printerData = this.props.data;

    return (
      <div>
        <button name="currentView" value="printers" onClick={this.onClick}>
          Printers
        </button>
        <button name="currentView" value="addPrinters" onClick={this.onClick}>
          Add Printers
        </button>
        <button name="currentView" value="loginPage" onClick={this.onClick}>
          Login
        </button>
        <button name="currentView" value="archive" onClick={this.onClick}>
          Archive
        </button>
        <RenderedView value={this.state.currentView}> </RenderedView>
      </div>
    );
  }
}

class RenderedView extends Component {
  constructor(props) {
    super(props);
  }
  //This is the generated list responsible for holding all of the files that we are using.
  render() {
    switch (this.props.value) {
      case "printers":
        return <PrinterList />;
      case "addPrinters":
        return <MakePrinter />;
      case "loginPage":
        return <LoginPage />;
      case "archive":
        return <div>Isnt Implemented Yet</div>;
      default:
        return <div>ERRRRROOOOORRRRR</div>;
    }
  }
}

export default NavBar;

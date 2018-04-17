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
    console.log(event.target.name, event.target.value)
    if (event.target.name != null) {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  render() {
    return (
      <nav>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand">MakerSpace Printer Queue</a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">

            <button
              className="nav-item button-link"
              name="currentView"
              value="printers"
              onClick={this.onClick}
            >
              Printers
            </button>
            <button
              className="nav-item button-link"
              name="currentView"
              value="addPrinters"
              onClick={this.onClick}
            >
              Add Printers
            </button>
            <button
              className="nav-item button-link"
              name="currentView"
              value="loginPage"
              onClick={this.onClick}
            >
              Login
            </button>
            <a
              className="nav-item nav-link"
              name="currentView"
              value="loginPage"
              onClick={this.onClick}
            >
              Login
            </a>
            <button
              className="nav-item button-link nav-link"
              name="currentView"
              value="archive"
              onClick={this.onClick}
            >
              Archive
            </button>
          </ul>
          </div>
        </nav>

        <RenderedView value={this.state.currentView}> </RenderedView>
      </nav>
    );
  }
}

class RenderedView extends Component {
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
        console.log(this.props.value)
        return <div>ERRRRROOOOORRRRR</div>;
    }
  }
}

export default NavBar;

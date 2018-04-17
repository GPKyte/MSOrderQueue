import React, { Component } from "react";

import MakePrinter from "./../Make/MakePrinters.js";
import PrinterList from "./../Printer/PrinterList.js";
import LoginPage from "./../LoginPage/LoginPage.js";
import SideBar from "./../SideBar/SideBarList.js";

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
    if (event != null) {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand">MakerSpace Printer Queue</a>
          <NavBarButtons
            onClick={this.onClick}
            currentView={this.state.currentView}
          />
        </nav>
        <div className="content-body">
          <SideBar url={this.props.url} />
          <RenderedView url={this.props.url} value={this.state.currentView}>
            {" "}
          </RenderedView>
        </div>
      </div>
    );
  }
}

class RenderedView extends Component {
  //This is the generated list responsible for holding all of the files that we are using.
  render() {
    switch (this.props.value) {
      case "printers":
        return <PrinterList url={this.props.url} />;
      case "addPrinters":
        return <MakePrinter url={this.props.url} />;
      case "loginPage":
        return <LoginPage url={this.props.url} />;
      case "archive":
        return <div>Isnt Implemented Yet</div>;
      default:
        return <div>ERRRRROOOOORRRRR</div>;
    }
  }
}

class NavBarButtons extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    if (event.target.name != null) {
      this.props.onClick(event);
    }
  }

  render() {
    return (
      <div>
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
              className="nav-item button-link nav-link"
              name="currentView"
              value="printers"
              onClick={this.onClick}
            >
              Printers
            </button>
            <button
              className="nav-item button-link nav-link"
              name="currentView"
              value="addPrinters"
              onClick={this.onClick}
            >
              Add Printers
            </button>
            <button
              className="nav-item button-link nav-link"
              name="currentView"
              value="loginPage"
              onClick={this.onClick}
            >
              Login
            </button>
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
      </div>
    );
  }
}

export default NavBar;

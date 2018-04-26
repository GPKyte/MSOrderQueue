import React, { Component } from "react";

import MakePrinter from "./../Make Printers/MakePrinters.js";
import PrinterList from "./../Printer/PrinterList.js";
import LoginPage from "./../LoginPage/LoginPage.js";
import SideBar from "./../SideBar/SideBarList.js";
import ArchivePage from "./../Archive/Archive.js";
import Printer from "./../Fetch/Printers.js";
import Requests from "./../Fetch/Requests.js";
import QueuePopup from "./../QueuePopup/QueuePopup.js";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: "printers",
      printerObject: "",
      requestsObject: ""
    };
    this.onClick = this.onClick.bind(this);
    this.refresh = this.refresh.bind(this);
  }
  //When the component loads, this is called starting the interval to repeditally call on the api to refresh the data
  componentDidMount() {
    this.refresh();
    this.interval = setInterval(this.refresh, 5000);
  }
  //Reset the interval to stop calling the backend to refresh the data
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  //Refreshes the data from the api
  refresh() {
    Printer.getList(this.props.url)
      .then(data => this.setState({ printerObject: data }))
      .then(
        Requests.getList(this.props.url).then(data =>
          this.setState({ requestsObject: data })
        )
      );
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
        <nav className="navbar navbar-expand navbar-light bg-light flex-row">
          <a className="navbar-brand">MakerSpace Queue</a>
          <NavBarButtons
            onClick={this.onClick}
            currentView={this.state.currentView}
          />
        </nav>
        <div className="content-body">
          <SideBar
            url={this.props.url}
            requests={this.state.requestsObject}
            printers={this.state.printerObject}
          />
          <RenderedView
            url={this.props.url}
            printers={this.state.printerObject}
            requests={this.state.requestsObject}
            value={this.state.currentView}
          >
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
        return (
          <PrinterList
            url={this.props.url}
            printers={this.props.printers}
            requests={this.props.requests}
          />
        );
      case "add printers":
        return <MakePrinter url={this.props.url} />;
      case "login":
        return <LoginPage url={this.props.url} />;
      case "archive":
        return (
          <ArchivePage url={this.props.url} requests={this.props.requests} />
        );
      case "queueing":
        return (
          <QueuePopup
            url={this.props.url}
            requests={this.props.requests}
            printers={this.props.printers}
          />
        );
      default:
        return <div>ERRRRROOOOORRRRR</div>;
    }
  }
}

class NavBarButtons extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.button = this.button.bind(this);
  }

  //Automated event that processes the button that was clicked and changes the tab bassed on this.
  onClick(event) {
    if (event.target.name != null) {
      this.props.onClick(event);
    }
  }

  //This is a function for the creation of all of the buttons in the nav bar
  button(name) {
    var value = name.toLowerCase();
    return (
      <button
        className="nav-item button-link nav-link"
        name="currentView"
        value={value}
        key={value}
        onClick={this.onClick}
      >
        {name}
      </button>
    );
  }

  render() {
    //List of buttons to auto populate (if you change here make sure to change RenderedView class)
    var buttons = ["Printers", "Add Printers", "Login", "Archive", "Queueing"];

    return (
      <div id="navbar-btns">
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
            {buttons.map(i => {
              return this.button(i);
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default NavBar;

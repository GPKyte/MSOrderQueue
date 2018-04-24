import React, { Component } from "react";
import Printer from "./../Fetch/Printers.js";

class QueuePopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogShowing: false,
      showDropdown: "dropdown-menu",
      defaultPrinter: "Choose A Printer",
      printerSelection: "Choose A Printer",
      listOfFiles: [],
      listOfAmmounts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      colorOfPrinter: "red",
      currentPrinter: ""
    };
    this.onClick = this.onClick.bind(this);
    this.changeFileAmmount = this.changeFileAmmount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.patchPrinters = this.patchPrinters.bind(this);
  }

  getNameFronId(id) {
    for (var i = 0; i < this.props.printers.length; i++) {
      console.log(this.props.printers[i]);
      console.log(id);
      if (this.props.printers[i]["id"] === id) {
        return this.props.printers[i]["name"];
      }
    }
    return "Not Found";
  }

  changeFileAmmount(event) {
    var tempData = this.state.listOfAmmounts;
    tempData[event.target.id] = event.target.value;
    this.setState({
      listOfAmmounts: tempData
    });
  }

  handleChange(event) {
    if (event.target.type === "text") {
      console.log(event.target.value);
      this.setState({
        colorOfPrinter: event.target.value
      });
    }
  }

  //This is the base printer object that displays all of the data needed on every printer
  onClick(event) {
    if (event.target.value === "showDropdown") {
      if (this.state.showDropdown === "dropdown-menu") {
        this.setState({
          showDropdown: "dropdown-menu show"
        });
      } else {
        this.setState({
          showDropdown: "dropdown-menu"
        });
      }
    } else if (
      event.target.attributes.getNamedItem("value").value === "selection"
    ) {
      var selection = event.target.attributes.getNamedItem("valueobject").value;
      this.setState({
        printerSelection: this.getNameFronId(selection),
        showDropdown: "dropdown-menu"
      });
    }
  }

  patchPrinters() {
    if (this.state.printerSelection !== this.state.defaultPrinter) {
      var tempData = this.state.listOfAmmounts;
      //TODO Change requests to only be requests without 0
      var requestData = this.props.requests[0]["requestItems"];
      var finalData = [];
      for (var i = 0; i > requestData.length; i++) {
        finalData.push({ index: i, qty: tempData[i] });
      }
      //TODO Change requests to only be requests without 0
      Printer.patchRequest(
        this.props.url,
        this.state.printerSelection,
        this.props.requests[0],
        finalData,
        this.state.colorOfPrinter
      );
    } else {
      console.log("Not A valid Printer");
    }
  }

  printerList(items) {
    if (items != null) {
      items.map(i => {
        return <a className="dropdown-item">i</a>;
      });
    }
  }

  render() {
    var requestItem = this.props.requests[0]; //TODO Change this from 0 for when binded properly with which request we are feeding through
    var printerObjects = this.props.printers;
    return (
      <div className="modal-background-custom">
        <div className="custom-model">
          <div className="dropdown open">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              value="showDropdown"
              onClick={this.onClick}
            >
              {this.state.printerSelection}
              <span className="caret" />
            </button>
            <ul className={this.state.showDropdown}>
              {this.state.showDropdown &&
                printerObjects != null && (
                  <PrinterListDropdown
                    onClick={this.onClick}
                    data={printerObjects}
                  >
                    {" "}
                  </PrinterListDropdown>
                )}
            </ul>
          </div>
          {requestItem != undefined && (
            <FileList
              data={requestItem}
              changeFileAmmount={this.changeFileAmmount}
              listOfAmmounts={this.state.listOfAmmounts}
            />
          )}
          <input
            className="form-control"
            value={this.state.colorOfPrinter}
            onChange={this.handleChange}
            type="text"
          />
        </div>
        <button onClick={this.patchPrinters}>Trying To not die</button>
      </div>
    );
  }
}

class PrinterListDropdown extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    this.props.onClick(event);
  }

  //This is the generated list responsible for holding all of the files that we are using.
  render() {
    var size = 0;
    var printerName = this.props.data;

    if (printerName !== "") {
      return (
        <ul className="">
          {printerName.map(i => {
            size += 1;
            return (
              <div
                onClick={this.onClick}
                key={i["id"]}
                value={"selection"}
                valueobject={i["id"]}
              >
                {i["name"]}
              </div>
            );
          })}
        </ul>
      );
    } else {
      return <div>There seems to be no printers</div>;
    }
  }
}

class FileList extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onClick(event) {
    this.props.onClick(event);
  }

  handleChange(event) {
    if (event.target.type === "number") {
      this.props.changeFileAmmount(event);
    }
  }

  //This is the generated list responsible for holding all of the files that we are using.
  render() {
    var size = -1;
    var fileList = this.props.data; //Change this from 0 for when binded properly with which request we are feeding through

    if (fileList !== undefined) {
      return (
        <form className="form-group">
          {fileList["requestItems"].map(i => {
            size += 1;
            return (
              <div className="form-group row" key={i["fileName"]}>
                <div
                  className="col-sm"
                  onClick={this.onClick}
                  value={"selection"}
                  valueobject={i["fileName"]}
                >
                  {i["fileName"]}
                </div>
                <label className="">Quantity</label>
                <div className="col">
                  <input
                    className="form-control"
                    value={this.props.listOfAmmounts[size]}
                    onChange={this.handleChange}
                    type="number"
                    id={size}
                  />
                </div>
              </div>
            );
          })}
        </form>
      );
    } else {
      return <div>There seems to be no files</div>;
    }
  }
}

export default QueuePopup;

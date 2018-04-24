import React, { Component } from "react";

class QueuePopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogShowing: false,
      showDropdown: "dropdown-menu",
      printerSelection: "Choose A Printer",
      listOfFiles: [],
      listOfAmmounts: []
    };
    this.onClick = this.onClick.bind(this);
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

  //This is the base printer object that displays all of the data needed on every printer
  onClick(event) {
    console.log(event.target.value);
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
        printerSelection: this.getNameFronId(selection)
      });
    }
    console.log(this.state.showDropdown);
  }

  printerList(items) {
    if (items != null) {
      items.map(i => {
        return <a className="dropdown-item">i</a>;
      });
    }
  }

  render() {
    var requestItem = this.props.requests;
    var printerObjects = this.props.printers;
    console.log(requestItem);
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
          {requestItem != undefined && <FileList data={requestItem} />}
        </div>
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
          {console.log(printerName)}
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
    this.state = {
      fileListTemp: [0,0,0,0,0,0,0,0,0,0,0]
    }
    this.onClick = this.onClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }



  onClick(event) {
    this.props.onClick(event);
  }

  handleChange(event) {

    if (event.target.type === "number")
    var tempData = this.state.fileListTemp
    tempData[event.target.id] = event.target.value
    this.setState({
      fileListTemp: tempData
    })
  }

  //This is the generated list responsible for holding all of the files that we are using.
  render() {
    var size = -1;
    var fileList = this.props.data[0]; //Change this from 0 for when binded properly with which request we are feeding through

    if (fileList !== undefined) {
      return (
        <form className="form-group">
          {fileList["requestItems"].map(i => {
            size += 1;
            return (
                <div className="form-group row"
                key={i["fileName"]}>
                  <div
                    className="col-sm"
                    onClick={this.onClick}
                    value={"selection"}
                    valueobject={i["fileName"]}
                  >
                    {i["fileName"]}
                  </div>
                  <label
                    className=""
                  >
                    Quantity
                  </label>
                  <div className="col">
                    <input
                      className="form-control"
                      value={this.state.numberOfGuests}
                      onChange={this.handleChange}
                      type="number"
                      id={size}
                    ></input>
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

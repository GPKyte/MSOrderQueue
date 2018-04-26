import React, { Component } from "react";
import Printers from "./../Fetch/Printers.js";

class Printer extends Component {
  constructor(props) {
    super(props);
    //Patrick Gimpy told me to do this
    //ButtonText,
    this.state = {
      jacksgay: ["Loading", "", "Loading", "btn btn-outline-danger disabled card-button right"],
      currentPrinter: ""
    };
    this.onClick = this.onClick.bind(this);
  }

  //This is the base printer object that displays all of the data needed on every printer
  onClick(event) {
    console.log(event.target.value);
    if (this.props.data !== null) {
      switch (this.props.data["status"] + event.target.value) {
        case "BUSY0":
          return Printers.Cancel(this.props.url, this.props.data["id"]);
        case "BUSY1":
          return Printers.Finish(this.props.url, this.props.data["id"]);
        case "OPEN0":
          return null;
        case "OPEN1":
          return; //TODO Printers.Delete(this.props.url, this.props.data["id"]);;
        case "DONE0":
          return Printers.Restart(this.props.url, this.props.data["id"]);
        case "DONE1":
          return Printers.Clear(this.props.url, this.props.data["id"]);
        default:
          console.log("You cant touch this HAHAHAHAHA");
      }
    }
  }

  componentWillUpdate() {
    if (this.state.currentPrinter !== this.props.data["status"]) {
      switch (this.props.data["status"]) {
        case "OPEN":
          return this.setState({
            jacksgay: [
              "",
              "",
              "Delete",
              "btn btn-outline-danger card-button right"
            ],
            currentPrinter: this.props.data["status"]
          });
        case "BUSY":
          return this.setState({
            jacksgay: [
              "Cancel",
              "btn btn-outline-warn card-button left",
              "Finish",
              "btn btn-outline-success card-button right"
            ],
            currentPrinter: this.props.data["status"]
          });
        case "DONE":
          return this.setState({
            jacksgay: [
              "Restart",
              "btn btn-outline-warn card-button left",
              "Clear",
              "btn btn-outline-success card-button right"
            ],
            currentPrinter: this.props.data["status"]
          });
      }
    }
  }

  findRequestById(index, request, id) {
    console.log(index, request, id);
    for (var i = 0; i < request.length; i++) {
      console.log(request[i]["id"], id);
      if (request[i]["id"] === id) {
        return request[i]["requestItems"][index]["fileName"];
      }
    }
    return "Fucking Error";
  }

  render() {
    var printerData = this.props.data;
    var requestData = this.props.requests;
    return (
      <div className="card card-size" id={"printer/" + this.props.id}>
        <img
          className="card-img-top"
          src={require("./../Images/download.jpg")}
          alt="Card cap"
        />
        <div className="printer-name">{printerData["name"]}</div>
        {printerData["printItems"] !== null &&
          printerData["printItems"].map(i => {
            // Excludes non-printing items
            return i["qty"] > 0 ? (
              <div key={i["index"]}>
                <div className="print-item">
                  <div className="left">File: {i["index"] + 1}</div>
                  <div className="right">Qty: {i["qty"]}</div>
                </div>
              </div>
            ) : null;
          })}
        <div className="printer-status"> {printerData["status"]} </div>
        <div className="card-block bottom">
          {this.state.jacksgay[0] !== "" && (
            <button
              className={this.state.jacksgay[1]}
              onClick={this.onClick}
              value="0"
            >
              {this.state.jacksgay[0]}
            </button>
          )}
          <button
            onClick={this.onClick}
            value="1"
            className={this.state.jacksgay[3]}
          >
            {this.state.jacksgay[2]}
          </button>
        </div>
      </div>
    );
  }
}

export default Printer;

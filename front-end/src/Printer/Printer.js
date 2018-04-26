import React, { Component } from "react";

class Printer extends Component {
  constructor(props) {
    super(props);
    //Patrick Gimpy told me to do this
    //ButtonText,
    this.state = {
      jacksgay: ["", "", "", ""],
      currentPrinter: ""
    };

    this.onClick = this.onClick.bind(this);
  }

  //This is the base printer object that displays all of the data needed on every printer
  onClick() {
    switch (this.props.data["status"]) {
      case "BUSY":
        this.setState({
          jacksgay: ["", "", "", ""]
        });
    }
    this.props.finishButton(this.props.id);
  }

  componentWillUpdate() {
    if (this.state.currentPrinter !== this.props.data["status"]) {
      switch (this.props.data["status"]) {
        case "BUSY":
          return this.setState({
            jacksgay: ["", "", "Delete", "btn btn-outline-danger card-button left"],
            currentPrinter: this.props.data["status"]
          });
        case "OPEN":
          return this.setState({
            jacksgay: ["Cancel", "btn btn-outline-warn card-button right", "Finish", "btn btn-outline-success card-button left"],
            currentPrinter: this.props.data["status"]
          });
        case "DONE":
          return this.setState({
            jacksgay: ["Restart", "btn btn-outline-warn card-button right", "Clear", "btn btn-outline-success card-button left"],
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
                  <div className="left">File: {i["index"]+1}</div>
                  <div className="right">Qty: {i["qty"]}</div>
                </div>
              </div>
            ) : null;
          })}
        <div className="printer-status"> {printerData["status"]} </div>
        <div className="card-block bottom">
          {this.state.jacksgay[0] !== "" && <button className={this.state.jacksgay[1]} id="0">
            {this.state.jacksgay[0]}
          </button>}
          <button
            onClick={this.onClick}
            id="1"
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

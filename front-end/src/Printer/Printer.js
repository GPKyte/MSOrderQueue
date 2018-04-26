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
    this.whenUpdate = this.whenUpdate.bind(this);
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

  whenUpdate(printer) {
    // switch (this.props.data["status"]) {
    //   case "BUSY":
    //     return this.setState({
    //       jacksgay: ["", "", "", ""]
    //     });
    //     case "OPEN":
    //     return this.setState({
    //
    //     })
    // }
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
    this.whenUpdate(printerData);
    return (
      <div className="card card-size" id={"printer/" + this.props.id}>
        <img
          className="card-img-top"
          src={require("./../Images/download.jpg")}
          alt="Card cap"
        />
        {printerData["name"]}
        {printerData["printItems"] !== null &&
          printerData["printItems"].map(i => {
            // Excludes non-printing items
            return i["qty"] > 0 ? (
              <div key={i["index"]}>
                <div className="print-item">
                  <div className="left">
                    File:{" "}
                    {this.findRequestById(
                      i["index"],
                      requestData,
                      printerData["requestID"]
                    )}{" "}
                    :
                  </div>
                  <div className="right">Qty: {i["qty"]}></div>
                </div>
              </div>
            ) : null;
          })}
        <div className="printer-status"> {printerData["status"]} </div>
        <div className="card-block bottom">
          <button className="btn btn-outline-danger card-button left" id="0">
            Cancel
          </button>
          <button
            onClick={this.onClick}
            id="1"
            className="btn btn-outline-success card-button right"
          >
            Finish
          </button>
        </div>
      </div>
    );
  }
}

export default Printer;

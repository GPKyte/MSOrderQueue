import React, { Component } from "react";

class Printer extends Component {
  constructor(props) {
    super(props);
    //Patrick Gimpy told me to do this
    //ButtonText,
    this.state = {
      jacksgay:["","",""]
    }

    this.onClick = this.onClick.bind(this);
  }

  //This is the base printer object that displays all of the data needed on every printer
  onClick() {
    switch (this.props.data["status"]) {
      case "BUSY":
        this.setState({
          jacksgay:
        });
    }
    this.props.finishButton(this.props.id);
  }

  // findRequestById(id) {
  //   for ()
  // }

  render() {
    var printerData = this.props.data;
    var requestData = this.props.requests;

    return (
      <div className="card card-size " id={"printer/" + this.props.id}>
        <img
          className="card-img-top"
          src={require("./../Images/download.jpg")}
          alt="Card cap"
        />
        {printerData["name"]}
        {printerData["printItems"] !== null &&
          printerData["printItems"].map(i => {
            return (
              <div key={i["index"]}>
                {i["index"]} : {i["qty"]}
              </div>
            );
          })}
        <div> Status: {printerData["status"]} </div>
        <div className="card-block">
          <button className="btn btn-primary card-button">Dequeue</button>
          <button
            onClick={this.onClick}
            className="btn btn-outline-success card-button"
          >
            Finish
          </button>
        </div>
      </div>
    );
  }
}

export default Printer;

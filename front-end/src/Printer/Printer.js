import React, { Component } from "react";

class Printer extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  //This is the base printer object that displays all of the data needed on every printer
  onClick() {
    this.props.finishButton(this.props.id);
  }

  render() {
    var printerData = this.props.data;

    return (
      <div className="card card-size" id={"printer/" + this.props.id} >
        <img
          className="card-img-top"
          src={require("./../Images/download.jpg")}
          alt="Card cap"
        />
        <p className="printer-name">{printerData["name"]}</p>
        {printerData["printItems"] !== null && printerData["printItems"].map(i =>
          // Excludes non-printing items
          {return i["qty"] > 0 ?
            (<div className="print-item"><div className="left">File: {i["index"]+1}</div>
              <div className="right">Qty: {i["qty"]}</div></div>)
            :  null})
        }
        <div className="printer-status">{printerData["status"]}</div>
        <div className="card-block bottom">
          <button className="btn btn-outline-danger card-button left">Cancel</button>
          <button
            onClick={this.onClick}
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

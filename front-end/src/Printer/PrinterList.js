import React, { Component } from "react";
import Printer from "./Printer.js";
var Promise = require("bluebird");
Promise.promisifyAll(require("request"));

class PrinterList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      printerList: null
    };
    this.refresh = this.refresh.bind(this);
    this.deletePrinter = this.deletePrinter.bind(this);
  }

  printerList() {
    
    fetch(this.props.url + "/api/printers").then(results => {
      if (results.status === 200) {
        console.log(results);
        results
          .json()
          .then(data => ({
            data: data,
            status: results.status
          }))
          .then(results => {
            this.setState({
              printerList: results["data"]
            });
          });
      } else {
        throw new Error("This project SUCKS!");
      }
    });
  }

  componentDidMount() {
    this.printerList();
  }

  deletePrinter(id) {

    const headersI = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "True"
    };

    const myRequest = new Request(this.props.url + "/api/printers/" + id, {
      method: "DELETE",
      headers: headersI
    });

    fetch(myRequest).then(response => {
      this.printerList();
    });
  }

  refresh() {
    this.printerList();
  }

  render() {
    //Make This a object to be repeated
    var ListOfPrinters = this.state.printerList;
    var refreshButton = () => (
      <button
        onClick={this.refresh}
        className="btn btn-outline-primary btn-sm right"
      >
        Refresh{" "}
      </button>
    );
    //Generates all of the printers that we are using for the project
    console.log(ListOfPrinters);
    if (ListOfPrinters != null && ListOfPrinters.length > 0) {
      return (
        <div className="page-header">
          <ul className="PrinterContainer row">
            <h1 className="printerTitle">Printers {refreshButton()}</h1>
            {ListOfPrinters.map(i => {
              return (
                <Printer
                  key={i["id"]}
                  id={i["id"]}
                  deleteFunction={this.deletePrinter}
                  data={i}
                />
              );
            })}
          </ul>
        </div>
      );
    } else {
      return (
        <div>
          There seems to be no printers, server might be down or you can try
          refreshing.
          <div />
          {refreshButton()}
        </div>
      );
    }
  }
}

export default PrinterList;

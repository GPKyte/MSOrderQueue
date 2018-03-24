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
    fetch("http://localhost:8080/api/printers").then(results => {
      if (results.status === 200) {
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

    const myRequest = new Request("http://localhost:8080/api/printers/" + id, {
      method: "DELETE",
      headers: headersI
    });

    fetch(myRequest).then(response => console.log(response));
  }

  refresh() {
    this.printerList();
  }

  render() {
    //Make This a object to be repeated
    var ListOfPrinters = this.state.printerList;
    //Generates all of the printers that we are using for the project
    if (ListOfPrinters != null) {
      return (
        <div className="page-header">
          <h1>Printers</h1>
          <ul className="PrinterContainer">
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
          <button
            onClick={this.refresh}
            className="btn btn-outline-primary btn-sm"
          >
            Refresh{" "}
          </button>
          <button onClick={this.makeNewPrinter}>Make New Printer </button>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default PrinterList;

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
    this.makeNewPrinter = this.makeNewPrinter.bind(this);
    this.deletePrinter = this.deletePrinter.bind(this);
  }



  printerList() {
    fetch("http://localhost:8080/api/printers").then(results => {
      if (results.status === 200) {
        results.json().then(data => ({
          data: data,
          status : results.status
        })).then( results => {
          this.setState({
            printerList: results['data']
          });
        })


      } else {
        throw new Error("This project SUCKS!");
      }
    });
    console.log(this.state.printerList, "Hello");
  }

  componentDidMount() {
    this.printerList();
  }

  deletePrinter(id) {
    const headersI = {
      'Content-Type': 'application/json'
    }

    const myRequest = new Request(
      'http://localhost:8080/api/printers',
      {'method': 'DELETE',
      headers: headersI,
      body: '{"id" : "5ab1859cdb70af2d3db69b95"}'
    });
    fetch(myRequest).then(response => response.blob().then(response => console.log(response)));


  }

  makeNewPrinter() {
    const headersI = {
      'Content-Type': 'application/json'
    }

    const myRequest = new Request(
      'http://localhost:8080/api/printers',
      {'method': 'POST',
      headers: headersI,
      body: '{"name": "Mitch", "brand": "MakerBot", "model": "5th Gen Replicator", "status": "BUSY"}'
    });
    fetch(myRequest).then(response => response.blob().then(response => console.log(response)));
  }

  refresh() {
    this.printerList();
  }

  render() {
    //Make This a object to be repeated
    var ListOfPrinters = this.state.printerList;
    console.log(ListOfPrinters);
    //Generates all of the printers that we are using for the project
    if (ListOfPrinters != null) {
      return (
        <div>
          <ul className="PrinterContainer">
            {ListOfPrinters.map(i => {
              return <Printer key={i["id"]} data={i} />;
            })}
          </ul>
          <button onClick={this.refresh}>Refresh </button>
          <button onClick={this.makeNewPrinter}>Make New Printer </button>
          <button onClick={this.deletePrinter}> Delete Printer </button>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default PrinterList;

import React, { Component } from "react";
import Printer from "./Printer.js";
var Promise = require("bluebird");
Promise.promisifyAll(require("request"));

class PrinterList extends Component {

  render() {
    //Make This a object to be repeated
    var ListOfPrinters = this.props.printers;

    //Generates all of the printers that we are using for the project
    if (ListOfPrinters != null && ListOfPrinters.length > 0) {
      return (
        <div className="page-header">
          <ul className="PrinterContainer row">
            <div className="printerTitle"><h3>Printers</h3></div>
            {ListOfPrinters.map(i => {
              return (
                  <Printer
                  key={i["id"]}
                  id={i["id"]}
                  finishButton={this.finishPrinter}
                  requests={this.props.requests}
                  url={this.props.url}
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
          refreshing the page.
          <div />
        </div>
      );
    }
  }
}

export default PrinterList;

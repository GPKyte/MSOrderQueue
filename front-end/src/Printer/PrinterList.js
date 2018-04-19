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
            <h1 className="printerTitle">Printers</h1>
            {ListOfPrinters.map(i => {
              return (
                <Printer
                  key={i["id"]}
                  id={i["id"]}
                  finishButton={this.finishPrinter}
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

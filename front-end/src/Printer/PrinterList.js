import React, { Component } from "react";
import Printer from "./Printer.js";

class PrinterList extends Component {
  render() {
    //Make This a object to be repeated
    var ListOfPrinters = this.props.data;
    var size = 0;
    //Generates all of the printers that we are using for the project
    if (ListOfPrinters != null) {
      return (
        <div>
          <ul className="PrinterContainer">
            {ListOfPrinters.map(i => {
              size += 1;
              return <Printer key={size} data={i} />;
            })}
          </ul>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default PrinterList;

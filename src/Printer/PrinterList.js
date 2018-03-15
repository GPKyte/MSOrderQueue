import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Printer from './Printer.js'

class PrinterList extends Component {
  render() {
    return (
      <renderPrinters className="Printer">
        <script>
          ReactDOM.render(<Printer/>, document.getElementById("Printer"))
        </script>
      </renderPrinters>

    );
  }

}

function renderPrinters() {
  var printerArr = '';

  for (var i = 0; i > 3; i++) {
    printerArr += <Printer></Printer>;
  }

  return (
    printerArr
  );
}

export default PrinterList;

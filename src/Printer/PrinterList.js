import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Printer from './Printer.js'

class PrinterList extends Component {



  render() {

    var ListOfPrinters = this.props.data; //Make This a object to be repeated



      if (ListOfPrinters != null) {
        return (
          <div>
            <ul className="PrinterContainer">
            {

                ListOfPrinters.map(i => {
                return <Printer data={i}></Printer>
            })}
            </ul>
            <div className="renderPrinters">
            </div>
            <script>
              // ReactDOM.render(<Printer/>, document.getElementById("Printers"));
            </script>
          </div>
        )}
        else {
          return <div></div>
        }
  }

}

export default PrinterList;

import React, { Component } from 'react';
import Printer from './Printer.js'

class PrinterList extends Component {



  render() {

    var ListOfPrinters = this.props.data; //Make This a object to be repeated
    var size = 0;


      if (ListOfPrinters != null) {
        return (
          <div>
            <ul className="PrinterContainer">
            {

                ListOfPrinters.map(i => {
                  size +=1;
                return <Printer key={size} data={i}></Printer>
            })}
            </ul>
          </div>
        )}
        else {
          return <div></div>
        }
  }

}

export default PrinterList;

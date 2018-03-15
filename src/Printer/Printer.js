import React, { Component } from 'react';

class Printer extends Component {

    constructor(props) {
      super(props);
      this.printerData;
    }

    setPrinterData(passedData) {
      this.printerData = passedData;
    }



  render() {
    this.printerData = this.props.data;
    return(
      <div className="Printer">
        Hello World!
        <button>{this.printerData}</button>

      </div>
    )
  }
}




export default Printer;

import React, { Component } from "react";
import Printer from "./Printer.js";


class PrinterList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      printerList: null
    };
    this.refresh = this.refresh.bind(this);
  }

  printerList() {
    fetch('http://localhost:8080/api/printers')
      .then( results  => this.setState({
        printerList: results.json()
      }));
      console.log(this.state.printerList)
  }

  componentDidMount() {
    this.printerList();
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
            { ListOfPrinters.map(i => {
              return <Printer key={i['id']} data={i} />})}
          </ul>
          <button onClick={this.refresh}>Refresh </button>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default PrinterList;

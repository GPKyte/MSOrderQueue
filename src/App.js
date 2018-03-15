import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import PrinterList from './Printer/PrinterList.js';

class App extends Component {



  render() {
    const printers = [1,10,20,30,40,50];
    return (
      <PrinterList data = {printers} className="App">
      <script>
        ReactDOM.render(<PrinterList/>, document.getElementById("PrinterList"))
      </script>
      </PrinterList>
    );
  }

}

export default App;

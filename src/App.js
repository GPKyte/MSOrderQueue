import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import PrinterList from './Printer/PrinterList.js';

class App extends Component {
  render() {
    return (
      <PrinterList className="App">
      <script>
        ReactDOM.render(<PrinterList/>, document.getElementById("PrinterList"))
      </script>
      </PrinterList>
    );
  }

}

export default App;

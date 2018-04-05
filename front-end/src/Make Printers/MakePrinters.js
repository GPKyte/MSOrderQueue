import React, { Component } from "react";
var Promise = require("bluebird");
Promise.promisifyAll(require("request"));

class MakePrinter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PrinterName: "Geoffrey",
      Model: "SomeModel",
      Brand: "MakerBot",
      Status: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    if (name != null) {
      this.setState({ [event.target.name]: event.target.value });
    }
  }
  onClick() {
    const headersI = {
      "Content-Type": "application/json"
    };

    const myRequest = new Request("http://localhost:8080/api/printers", {
      method: "POST",
      headers: headersI,
      body: JSON.stringify({
        name: this.state.PrinterName,
        brand: this.state.Model,
        model: this.state.Brand,
        status: this.state.Status
      })
    });
    fetch(myRequest).then(response =>
      response.blob().then(response => console.log(response))
    );
  }

  render() {
    return (
      <div>
        This is for testing the addition of printers and will not be in the final iteration
        <div/>
        <input
          type="text"
          name="PrinterName"
          value={this.state.PrinterName}
          onChange={this.handleChange}
        />
        <div />
        <input
          type="text"
          name="Model"
          value={this.state.Model}
          onChange={this.handleChange}
        />
        <div />
        <input
          type="text"
          name="Brand"
          value={this.state.Brand}
          onChange={this.handleChange}
        />
        <div />

        <select
          type="text"
          name="Status"
          value={this.state.Status}
          onChange={this.handleChange}
        >
          <option value="READY">Ready</option>
          <option value="BUSY">Busy</option>
          <option value="FINISHED">Finished</option>
        </select>
        <div />

        <button onClick={this.onClick} className="btn">
          Make Printer
        </button>
      </div>
    );
  }
}

export default MakePrinter;

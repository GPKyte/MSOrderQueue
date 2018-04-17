import React, { Component } from "react";
var Promise = require("bluebird");
Promise.promisifyAll(require("request"));

class MakeRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PrinterName: "Geoffrey",
      Model: "SomeModel",
      Brand: "MakerBot",
      Status: "READY"
    };
    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    if (name != null) {
      this.setState({ [name]: event.target.value });
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
      <div className="container">
        This is for testing the addition of printers and will not be in the
        final iteration
        <div />
        <div className="input-group mb-3 text-input-50">
          <div className="input-group-prepend">
            <div className="input-group-text" id="inputGroup-sizing-default">
              Printer Name
            </div>
          </div>
          <input
            type="text"
            name="PrinterName"
            className="form-control"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={this.state.PrinterName}
            onChange={this.handleChange}
          />
        </div>
        <div />
        <div className="input-group mb-3 text-input-50">
          <div className="input-group-prepend">
            <div className="input-group-text" id="inputGroup-sizing-default">
              Model
            </div>
          </div>
          <input
            type="text"
            name="Model"
            className="form-control"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={this.state.Model}
            onChange={this.handleChange}
          />
        </div>
        <div />
        <div className="input-group mb-3 text-input-50">
          <div className="input-group-prepend">
            <div className="input-group-text" id="inputGroup-sizing-default">
              Brand
            </div>
          </div>
          <input
            type="text"
            name="Brand"
            className="form-control"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={this.state.Brand}
            onChange={this.handleChange}
          />
        </div>
        <div />
        <select
          type="text"
          name="Status"
          className="input-group mb-3 custom-select"
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

export default MakeRequest;

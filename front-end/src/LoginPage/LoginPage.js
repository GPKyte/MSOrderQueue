import React, { Component } from "react";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };

    //There Needs to be a cleaner way to do this
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
    //Submit API Request To Login
    console.log(this.state.username);
    console.log(this.state.password);
  }
  render() {
    return (
      <div className="Printer container">
        <div className="input-group mb-3 text-input-50">
          <div className="input-group-prepend">
            <div className="input-group-text" id="inputGroup-sizing-default">
              Username
            </div>
          </div>
          <input
            type="text"
            className="form-control"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={this.state.username}
            onChange={this.handleChange}
            name="username"
          />
        </div>
        <div />
        <div className="input-group mb-3 text-input-50">
          <div className="input-group-prepend">
            <div className="input-group-text" id="inputGroup-sizing-default">
              Password
            </div>
          </div>
          <input
            type="password"
            className="form-control"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={this.state.password}
            onChange={this.handleChange}
            name="password"
          />
        </div>
        <div />
        <button onClick={this.onClick} className="btn">
          Login
        </button>
      </div>
    );
  }
}

export default LoginPage;

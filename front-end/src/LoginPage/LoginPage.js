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


  handleChange (event) {
    const name = event.target.name;
    if (name != null) {
      this.setState({[event.target.name]: event.target.value});
    }
  }

  onClick() {
    //Submit API Request To Login
    console.log(this.state.username);
    console.log(this.state.password);
  }
  render() {
    
    return (
      <div className="Printer">
        <input type="text"  value={this.state.username} onChange={this.handleChange} name="username" />
        <div/>
        <input type="password" value={this.state.password} onChange={this.handleChange} name="password" />
        <div/>
        <button onClick={this.onClick} className="btn">Login</button>
      </div>
    );
  }
}

export default LoginPage;

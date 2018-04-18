import React, { Component } from "react";
import "./App.css";

import NavBar from "./NavBar/NavBar.js";

//import LoginPage from "./LoginPage/LoginPage.js";

class App extends Component {
  render() {
    const url = "https://localhost:8443";
    //This is a tepmorary page with all of the elements inside of it to get api calls working before we end up seperating them into where they need to be
    return (
      <div className="App Test">
        {/* This will be a sideBar on the left side */}
        <NavBar url={url} />
      </div>
    );
  }
}

export default App;

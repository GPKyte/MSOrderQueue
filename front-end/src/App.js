import React, { Component } from "react";
import "./App.css";
import SideBar from "./SideBar/SideBarList.js";

import NavBar from "./NavBar/NavBar.js";
//import LoginPage from "./LoginPage/LoginPage.js";

class App extends Component {
  render() {
    //This is a tepmorary page with all of the elements inside of it to get api calls working before we end up seperating them into where they need to be
    return (
      <div className="App Test">
        {/* This will be a sideBar on the left side */}
        <div className="SideBar">
          <SideBar />
        </div>
        <NavBar />
      </div>
    );
  }
}

export default App;

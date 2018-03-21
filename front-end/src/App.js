import React, { Component } from "react";
import "./App.css";
import PrinterList from "./Printer/PrinterList.js";
import SideBar from "./SideBar/SideBarList.js";
import LoginPage from "./LoginPage/LoginPage.js";

class App extends Component {
  render() {
    const printers = [1, 10, 20, 30, 40];
    const PrintJobs = [
      {
        id: 1,
        email: "3montyjack@gmail.com",
        type: "USER",
        firstName: "Jack",
        lastName: "string",
        privileges: "ADMIN/STAFF/REQUESTER",
        requests: [
          {
            _id: "timestamp",
            comments: "string",
            status: "ORDERED/IN_PROCESS/COMPLETED",
            "class?": "true/false",
            files: [
              { file: "notBlob", qty: "int", printer: "string" },
              { file: "blob", qty: "int", printer: "string" }
            ]
          }
        ]
      },
      {
        id: 2,
        email: "gavin@yahoo.net",
        type: "USER",
        firstName: "Gavin",
        lastName: "string",
        privileges: "ADMIN/STAFF/REQUESTER",
        requests: [
          {
            _id: "timestamp",
            comments: "string",
            status: "ORDERED/IN_PROCESS/COMPLETED",
            "class?": "true/false",
            files: [{ file: "blob", qty: "int", printer: "string" }]
          }
        ]
      },
      {
        id: 3,
        email: "Solomon@nerd.z",
        type: "USER",
        firstName: "Yams",
        lastName: "string",
        privileges: "ADMIN/STAFF/REQUESTER",
        requests: [
          {
            _id: "timestamp",
            comments: "string",
            status: "ORDERED/IN_PROCESS/COMPLETED",
            "class?": "true/false",
            files: [{ file: "blob", qty: "int", printer: "string" }]
          }
        ]
      }
    ];
    //This is a tepmorary page with all of the elements inside of it to get api calls working before we end up seperating them into where they need to be
    return (
      <div className="container">
        {/* This will be a sideBar on the left side */}
        <aside>
          <SideBar className="row" data={PrintJobs} />
        </aside>
        {/* This will be in the main part of the view */}
        <PrinterList data={printers} className="App" />
        {/* This will be a seperate page when finished */}
        <LoginPage />
      </div>
    );
  }
}

export default App;

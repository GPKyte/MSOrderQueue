import React, { Component } from "react";
import "./App.css";
import PrinterList from "./Printer/PrinterList.js";
import SideBar from "./SideBar/SideBarList.js";

class App extends Component {
  render() {
    const printers = [1, 10, 20, 30, 40];
    const PrintJobs = [
      {
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
              { file: "blob", qty: "int", printer: "string" },
              { file: "blob", qty: "int", printer: "string" }
            ]
          }
        ]
      },
      {
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
        email: "Soloman@nerd.z",
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

    return (
      <div className="container">
        <SideBar className="row" data={PrintJobs} />
        <PrinterList data={printers} className="App">
          <script>
            ReactDOM.render(<PrinterList />,
            document.getElementById("PrinterList"))
          </script>
        </PrinterList>
      </div>
    );
  }
}

export default App;

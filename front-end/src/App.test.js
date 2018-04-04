import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Printer from "./Printer/Printer.js"

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Printer />, div);
  ReactDOM.unmountComponentAtNode(div);
});

import React, { Component } from "react";

class QueuePopup extends Component {
  constructor(props) {
    super(props);
    this.state({
      dialogShowing: false
    });
    this.onClick = this.onClick.bind(this);
  }

  //This is the base printer object that displays all of the data needed on every printer
  onClick(event) {
    if (event != null) {
    }
  }

  render() {
    return (
      <div id="myModal" className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1> Requester </h1>

              <p>  Printer Name </p>
              <p> Print items </p>
              <p> Quanity</p>
              <p> Print items </p>
              <p> Quanity</p>
              <p> Print items </p>
              <p> Quanity Clicking box wiht arrows</p>

              <p> Color </p>

              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>

              <h4 className="modal-title">Modal Header</h4>
            </div>
            <div className="modal-body">
              <p>Some text in the modal.</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default QueuePopup;

import React, { Component } from "react";
import Request from "./../Fetch/Requests.js"

class ArchivePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      archiveData: []
    }

    this.onClick = this.onClick.bind(this);
    this.refresh = this.refresh.bind(this);
  }


  //This is the base printer object that displays all of the data needed on every printer

  onClick() {
    this.props.deleteFunction(this.props.id);
  }

  //When the component loads, this is called starting the interval to repeditally call on the api to refresh the data
  componentDidMount() {
    this.refresh();
    this.interval = setInterval(this.refresh, 5000);
  }
  //Reset the interval to stop calling the backend to refresh the data
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  refresh() {
    Request.getArchive(this.props.url).then(response => {
      this.setState({
        archiveData: response
      })
    })
  }
  render() {
    var printerData = this.state.archiveData;
    var size = -1;
    return (
      <div className="container">
        <h3>Archive</h3>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Comments</th>
              <th scope="col">Timestamp</th>
              <th scope="col">For Class?</th>
            </tr>
          </thead>
        <tbody>
          {printerData != null && printerData.map(i => {
          console.log(i);
          size++;
          return <tr>
            <td printerData="Id">{size}</td>
            <td printerData="User">{i["user"]}</td>
            <td printerData="Comments">{i["comments"]}</td>
            <td printerData1="Timestamp">{i["timestamp"]}</td>
            <td printerData="For Class">{i["forClass"]? "Yes":"No"}</td>
          </tr>
          })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default ArchivePage;

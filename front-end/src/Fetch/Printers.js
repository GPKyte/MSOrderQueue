

class Printers {

  getPrinterList() {
    return ""
  }

  patchRequest(path) {
    const headersI = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "True"
    };

    const myRequest = new Request("http://localhost:8080/api/Printers" + path, {
      method: "PATCH",
      headers: headersI,
      body: JSON.stringify({
        name: this.state.PrinterName,
        brand: this.state.Model,
        model: this.state.Brand,
        status: this.state.Status
      })
    });

    fetch(myRequest).then(response => {
      this.requestList();
    });
  }
}

export default Printers;

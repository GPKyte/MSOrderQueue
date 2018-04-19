const header = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "True"
};

function printerList(url) {
  return new Promise((resolve, reject) => {
    if (url != null) {
      fetch(url + "/api/printers", header).then(results => {
        if (results.status === 200) {
          results
            .json()
            .then(data => ({
              data: data,
              status: results.status
            }))
            .then(results => {
              resolve(results.data);
            });
        } else {
          throw new Error("This project SUCKS!");
        }
      });
    }
  }
);
}

this.getPrinterList = function(url) {
  return printerList(url);
};

this.patchRequest = function(url, path, printerObject) {
  const myRequest = new Request(url + "/api/Printers" + path, {
    method: "PATCH",
    headers: header,
    body: JSON.stringify({
      name: printerObject["name"],
      brand: printerObject["brand"],
      model: printerObject["model"],
      status: printerObject["status"]
    })
  });

  fetch(myRequest).then(response => {
    this.requestList();
  });
};

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
  });
}

this.getList = function(url) {
  return printerList(url);
};

this.requestItems = function(url, printerID, requestObject, fileList, color) {
  const myRequest = new Request(url + "/api/printers/" + printerID, {
    method: "PATCH",
    headers: header,
    body: JSON.stringify({
      status: "BUSY",
      requestID: requestObject["id"],
      printItems: fileList,
      color: color
    })
  });
  fetch(myRequest).then(response => {
    this.getList(url);
  });
};

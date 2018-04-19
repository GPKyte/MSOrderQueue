const header = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "True"
};

var printerObjects = "";

function printerList(url) {
  console.log(url);
  fetch("/api/printers", header).then(results => {
    if (results.status === 200) {
      console.log(results);
      results.json()
        .then(data => ({
          data: data,
          status: results.status
        }))
        .then(results => {
          printerObjects = results;
        });
    } else {
      throw new Error("This project SUCKS!");
    }
  });
}

this.getPrinterList = function() {
  return printerObjects;
};

this.getUpdatedPrinterList = function(url) {
  printerList(url);
  return printerObjects;
};

this.patchRequest = function(url, path, printerObject) {
  const myRequest = new Request(url + "/api/Printers" + path, {
    method: "PATCH",
    headers: header,
    body: JSON.stringify({
      name: printerObject['name'],
      brand: printerObject['brand'],
      model: printerObject['model'],
      status: printerObject['status']
    })
  });

  fetch(myRequest).then(response => {
    this.requestList();
  });
};

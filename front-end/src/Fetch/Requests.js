const header = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "True"
};

this.deleteRequest = function(url, id) {
  return new Promise((resolve, reject) => {
    console.log("Helllppppp");
    const myRequest = new Request(url + "/api/requests/" + id, {
      method: "DELETE",
      headers: header
    });

    fetch(myRequest).then(response => {
      resolve(requestList(url));
    });
  });
};

function requestList(url) {
  return new Promise((resolve, reject) => {
    fetch(url + "/api/queue").then(results => {
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
        throw new Error("Server No Longer Has Has The File");
      }
    });
  });
}

this.getList = function(url) {
  var temp = "";
  temp = requestList(url);
  return temp;
};

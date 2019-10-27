function requestPOST(url, data, success=()=>{}) {
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data)
  }).then(
    response => response.json()
  ).then(
    result => success(result)
  );
}

function requestGET(url, success) {
  fetch(url, {
    method: "GET"
  }).then(
    response => response.json()
  ).then(
    result => success(result)
  );
}

const hello = () => {
  let databaseRequest = fetch("http://localhost:8000/api/hello", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  });

  databaseRequest
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Error:", error));
}

hello();

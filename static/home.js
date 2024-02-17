fetch("https://robotting.pythonanywhere.com/home", {
  method: "GET",
  mode: "cors",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error("Fetch erSror:", error));

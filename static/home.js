fetch("https://robotting.pythonanywhere.com/home", {
  method: "GET",
  mode: "cors",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  }
})
.then(response => document.body.innerHTML=response.text())
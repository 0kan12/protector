fetch("https://robotting.pythonanywhere.com/home", {
  method: "POST",
  mode: "cors",
  credentials: "include",
  headers: {
    "Content-Type": "application/json"
  }
})
.then(response => response.text())
.then(body => document.body.innerHTML = body)
.catch(error => console.error('Fetch hatası:', error));

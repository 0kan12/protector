var pathName = window.location.pathname;
var id = pathName.split('/')[2];

if (pathName.startsWith("/magaza/") || pathName.startsWith("/ilan/")) {
    fetch("https://robotting.pythonanywhere.com" + pathName, {
        method: "POST",
        mode: "cors",
        credentials: "include",  // Credentials ekleyin
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.text())
    .then(data => {
        document.body.innerHTML += data;
    })
    .catch(error => console.error(error));
} else {
    console.error("Geçersiz URL path name");
}

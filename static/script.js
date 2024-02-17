var pathName = window.location.pathname;
var id = pathName.split('/')[2];
if (pathName.startsWith("/magaza/")) {
    fetch("https://robotting.pythonanywhere.com/magaza/" + id)
        .then(response => response.text())
        .then(data => {
            document.body.innerHTML += data;
        })
        .catch(error => console.error(error));
} else if (pathName.startsWith("/ilan/")) {
    fetch("https://robotting.pythonanywhere.com/ilan/" + id)
        .then(response => response.text())
        .then(data => {
            document.body.innerHTML += data;
        })
        .catch(error => console.error(error));
} else {
    console.error("Geçersiz URL path name");
}

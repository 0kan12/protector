var pathName = window.location.pathname;
        var id = pathName.split('/')[2];

        if (pathName.startsWith("/m/") || pathName.startsWith("/i/")) {
            fetch("https://robotting.pythonanywhere.com" + pathName, {
                method: "GET",
                mode: "cors",
                credentials: "include",  // Credentials ekleyin
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.text())
            .then(data => {
                document.getElementById('loading-container').style.display = 'none'; // Yüklenme ekranını gizle
                document.body.innerHTML += data;
            })
            .catch(error => console.error(error));
        } else {
            console.error("Geçersiz URL path name");
        }
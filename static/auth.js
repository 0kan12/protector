
    window.onload = function() {
        var urlParams = new URLSearchParams(window.location.search);
        var token = urlParams.get('token');

        if (token) {
            setSecurityCookie(token);
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

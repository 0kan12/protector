function openOAuthWindow() {
    var oauthWindow = window.open("https://authorize.roblox.com/?client_id=5479378895639925024&response_type=code&redirect_uri=https%3A%2F%2Frobotting.pythonanywhere.com&scope=openid&state=6789&nonce=12345&step=permissionRequest", "_blank");

    var interval = setInterval(function () {
        if (oauthWindow.closed) {
            clearInterval(interval);
            location.reload();
        }
    }, 1000);
}

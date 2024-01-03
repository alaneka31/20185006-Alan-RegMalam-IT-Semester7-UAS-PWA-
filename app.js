// service-worker.js

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
          console.log('Service Worker registered with scope:', registration.scope);
          // Panggil fungsi untuk mendapatkan token push message
          getPushToken();
      })
      .catch(error => {
          console.error('Service Worker registration failed:', error);
      });
}

document.addEventListener('DOMContentLoaded', function () {
  
  if ('Notification' in window) {
      
      Notification.requestPermission()
          .then(function (permission) {
              if (permission === 'granted') {
                  // ketika di Allow
                  displayNotification(); alert('notifikasi di izinkan. Anda bisa mengakses dan menerima notifikasi');
              } else if (permission === 'denied') {
                  // Ketika Blokir
                  alert('notifikasi diblokir. Anda tidak bisa mengakses dan menerima notifikasi.');
              }
          });
  }

  function displayNotification() {
    const options = {
        body: 'Hallo ada notifikasi',
        icon: 'icon.png', 
       
    };
  
    const notification = new Notification('Join Me Now', options);

    notification.onclick = function () {
        alert('Kamu telah Bergabung');
    };
}
});

document.getElementById('pushTokenButton').addEventListener('click', function () {
    // Generate a random token (for demonstration purposes)
    const randomToken = Math.random().toString(36).substr(2);
  
    // Display the token
    document.getElementById('tokenDisplay').textContent = `Token Anda: ${randomToken}`;
  });
  


// app.js

function scrollToPage(pageNumber) {
  const pageElement = document.getElementById(`page${pageNumber}`);
  pageElement.scrollIntoView({ behavior: 'smooth' });
}

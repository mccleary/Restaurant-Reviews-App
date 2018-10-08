/* Set up service worker here */
navigator.serviceWorker.register('/sw.js').then(function(reg) {
  console.log('Yay! Service worker successful ' + reg.scope);
}).catch(function(err) {
  console.log('Boo! Registration failed: ' + err);
});

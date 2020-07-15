if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
    .register('../sw-cached-pages.js')
    .then(reg => console.log('Successfully registered service worker'))
    .catch(err => console.log('Error: ' + err))
  })
}
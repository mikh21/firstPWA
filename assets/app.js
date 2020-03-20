if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then((reg) => console.log('ServiceWorker telah terdaftar', reg))
        .catch((err) => console.log('ServiceWorker belum terdaftar', err));
}
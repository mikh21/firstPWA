const toogle = document.getElementById('toogle');
const navbar = document.getElementById('nav');
const nav = document.querySelectorAll('.nav');


toogle.addEventListener('click', function () {
    navbar.classList.toggle('active');
});

nav.forEach(function (el) {
    el.addEventListener('click', function (e) {
        navbar.classList.remove('active');
    });
});
const nav = document.querySelector('nav');
const portfolio = document.querySelector('.portfolio');
window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        nav.style.height = '50px';
    } else {
        nav.style.height = '60px';
    }
})



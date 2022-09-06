const burgarMenu = document.getElementById('burgar');
const menuBar = document.getElementById('ulist');

const showMenuBar = () => {
    burgarMenu.classList.toggle('closeBar');
    menuBar.classList.toggle('showBar');
}

burgarMenu.addEventListener('click', showMenuBar)

const scrolled = () => {
    document.querySelector('header').classList.toggle('scrolled', window.scrollY > 10);
    document.querySelectorAll('a').forEach(link => {
        link.classList.toggle('colorSwitch', window.scrollY > 10);
    })
}

const topFunc = () => {
    const topBtn = document.getElementById('top');
    topBtn.classList.toggle('active', window.scrollY > 800);
}

window.addEventListener('scroll', topFunc);
window.addEventListener('scroll', scrolled);
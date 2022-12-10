document.addEventListener('DOMContentLoaded', () => {
    'use strict'
    const burgerButton = document.querySelector('.js-burger-button');
    const burgerMenu = document.querySelector('.js-burger-menu');

    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('js-burger-button')) {
            burgerButton.classList.toggle('_active');
            burgerMenu.classList.toggle('_active');
            return;
        }
        closeBurgerMenu();
    });

    function closeBurgerMenu() {
        burgerButton.classList.remove('_active');
        burgerMenu.classList.remove('_active');
    }
});
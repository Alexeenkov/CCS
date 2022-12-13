document.addEventListener('DOMContentLoaded', () => {
    'use strict'
    const links = document.querySelectorAll('[data-goto]');
    if (links.length === 0) return;

    for (const link of links) {
        link.addEventListener('click', (e) => {
            scrollToItem(e.target);
        });
    }
});

/**
 * Скролл до блока с селектором, указанном в атрибуте [data-goto] ссылки, по которой кликнули
 * @param {HTMLElement} link - ссылка, на которой сработало событие "Клик"
 */
function scrollToItem(link) {
    const gotoBlock = document.querySelector(link.dataset.goto);
    if (!link.dataset.goto || !gotoBlock) return;
    const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight - 20;
    window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth"
    });
}
document.addEventListener('DOMContentLoaded', () => {
    'use strict'
    const range = document.querySelector('.js-range-input');
    const valueElem = document.querySelector('.js-range-value');

    if (!range) return;
    range.addEventListener('input', () => {
        valueElem.textContent = range.value + '%';
    });
});
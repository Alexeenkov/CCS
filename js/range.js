document.addEventListener('DOMContentLoaded', () => {
    'use strict'
    const ranges = document.querySelectorAll('.js-range-input');

    if (ranges.length === 0) return;
    for (const range of ranges) {
        range.addEventListener('input', (e) => {
            const rangeContainer = e.target.closest('.js-range');
            if (!rangeContainer) return;
            const valuePublic = rangeContainer.querySelector('.js-range-value');
            valuePublic.textContent = e.currentTarget.value + '%';
        });
    }
});
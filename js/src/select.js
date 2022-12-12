document.addEventListener('DOMContentLoaded', () => {
    'use strict'
    const selects = document.querySelectorAll('.js-select');
    if (selects.length === 0) return;

    initSelects(selects);

    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('js-select-input')) {
            const select = e.target.closest('.js-select');
            toggleSelect(select);
            return;
        }
        if (e.target.classList.contains('js-select-item')) {
            changeItemSelect(e.target);
        }
        closeAllSelects();
    });
});

/**
 * Открывает/скрывает конкретный селект
 * @param {HTMLElement} select - селект, который необходимо открыть/закрыть
 */
function toggleSelect(select) {
    select.classList.toggle('_active');
}

/**
 * Закрывает все открытые селекты на странице
 */
function closeAllSelects() {
    const openedSelects = document.querySelectorAll('.js-select._active');
    if (openedSelects.length === 0) return;
    for (const select of openedSelects) {
        select.classList.remove('_active');
    }
}

/**
 * Выбирает значение селекта, по которому кликнул пользователь и записывает в оригинальный селект
 *
 * @param {HTMLElement} item - пункт списка, который был выбран
 */
function changeItemSelect(item) {
    const selectContainer = item.closest('.js-select');
    const select = selectContainer.querySelector('select');
    const selectValue = selectContainer.querySelector('.js-select-value');
    select.value = item.textContent;
    selectValue.textContent = item.textContent;
}

/**
 * Отрисовывает кастомный селект для каждого из селектов на странице
 * @param {HTMLCollection} selects - все селекты на странице с классом js-select
 */
function initSelects(selects) {
    for (const select of selects) {
        renderSelect(select);
    }
}

/**
 * Отрисовывет кастомный селект рядом с оригинальным для кастомизации
 * @param {HTMLElement} select - селект, который необходимо отрисовать на странице
 */
function renderSelect(select) {
    const selectedOption = select.querySelector('option[selected]');
    const options = select.querySelectorAll('option:not([selected])');
    const selectContainer = document.createElement('div');
    selectContainer.classList.add('select__container');
    selectContainer.innerHTML = `
        <div class="select__field field js-select-input">
            <span class="select__selected js-select-value">${selectedOption.textContent}</span>
            <div class="select__arrow">
                <svg viewBox="0 0 9 6" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="m8.93375 1.51079c0-.07143-.03572-.15179-.08929-.20536l-.44643-.44643c-.05357-.053571-.13393-.089286-.20535-.089286-.07143 0-.15179.035715-.20536.089286l-3.50893 3.50893-3.508928-3.50893c-.053572-.053571-.133929-.089286-.205357-.089286-.080357 0-.151786.035715-.205357.089286l-.446429.44643c-.0535715.05357-.0892859.13393-.0892859.20536 0 .07142.0357144.15178.0892859.20535l4.160711 4.16072c.05357.05357.13393.08928.20536.08928s.15179-.03571.20536-.08928l4.16071-4.16072c.05357-.05357.08929-.13393.08929-.20535z" />
                </svg>
            </div>
        </div>
        <div class="select__options-wrapper">
            <ul class="select__options js-select-list"></ul>
        </div>
    `;

    for (const option of options) {
        const item = document.createElement('li');
        item.classList.add('select__option', 'js-select-item');
        item.textContent = option.textContent;
        selectContainer.querySelector('.js-select-list').append(item);
    }

    select.append(selectContainer);
}
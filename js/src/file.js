document.addEventListener('DOMContentLoaded', () => {
    'use strict'
    const fileButtons = document.querySelectorAll('.js-file-button');
    const fileInputs = document.querySelectorAll('.js-file-input');
    if (fileButtons.length === 0 || fileInputs.length === 0) return;

    // При клике на кнопки "Прикрепить файл" (любое количество на странице)
    for (const button of fileButtons) {
        button.addEventListener('click', handleClickFileButton);
    }

    // При загрузке файла
    for (const input of fileInputs) {
        input.addEventListener('change', (e) => {
            const { files } = e.target;
            const fileContainer = e.target.closest('.js-file');
            const button = fileContainer.querySelector('.js-file-button');
            const removeBtn = fileContainer.querySelector('.js-file-remove');
            if (!fileContainer || !button) return;
            if (files.length > 0) {
                button.classList.add('_success');
                button.removeEventListener('click', handleClickFileButton);
                removeBtn.addEventListener('click', handlerRemoveFileBtn.bind(fileContainer, e.currentTarget, button, removeBtn));
                button.querySelector('.js-button-text').textContent = files[0]['name'];
            }
        });
    }
});

/**
 * Обрабатывает клик по кнопке "Прикрепить файл"
 * @param {Event} e - событие клика на кнопку загрузки файла 
 * @returns 
 */
function handleClickFileButton(e) {
    const fileContainer = e.target.closest('.js-file');
    if (!fileContainer) return;
    const inputFile = fileContainer.querySelector('input');
    inputFile.click();
}

/**
 * Обрабатывает клик по кнопке удаления загруженного файла
 * @param {HTMLElement} inputFile - элемент <input type="file">, соседний кнопке удаления
 * @param {HTMLElement} button - кнопка загрузки файла, в которой кнопка удаления
 * @param {HTMLElement} removeBtn - кнопка удаления загруженного файла, на которой срабатывает событие
 */
function handlerRemoveFileBtn(inputFile, button, removeBtn) {
    const fileContainer = button.closest('.js-file');
    inputFile.value = '';
    button.classList.remove('_success');
    button.querySelector('.js-button-text').textContent = 'Прикрепить файл';
    removeBtn.removeEventListener('click', handlerRemoveFileBtn.bind(fileContainer, inputFile, button, removeBtn));
    setTimeout(() => {
        button.addEventListener('click', handleClickFileButton);
    }, 0);
}
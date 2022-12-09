document.addEventListener('DOMContentLoaded', () => {
    'use strict'
    const fileButtons = document.querySelectorAll('.js-file-button');
    const fileInputs = document.querySelectorAll('.js-file-input');
    if (fileButtons.length === 0 || fileInputs.length === 0) return;

    for (const button of fileButtons) {
        button.addEventListener('click', handleClickFileButton);
    }

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
                button.querySelector('span').textContent = files[0]['name'];
            }
        });
    }
});

function handleClickFileButton(e) {
    const fileContainer = e.target.closest('.js-file');
    if (!fileContainer) return;
    const inputFile = fileContainer.querySelector('input');
    inputFile.click();
}

function handlerRemoveFileBtn(inputFile, button, removeBtn) {
    const fileContainer = button.closest('.js-file');
    inputFile.value = '';
    button.classList.remove('_success');
    button.querySelector('span').textContent = 'Прикрепить файл';
    removeBtn.removeEventListener('click', handlerRemoveFileBtn.bind(fileContainer, inputFile, button, removeBtn));
    setTimeout(() => {
        button.addEventListener('click', handleClickFileButton);
    }, 0);
}
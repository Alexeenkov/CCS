document.addEventListener('DOMContentLoaded', () => {
    'use strict'
    addDotsBetweenStepsIcons();

    window.addEventListener('resize', () => {
        // При изменении размеров окна браузера удаляем все текущие точки на странице
        // и добавляем новые с пересчитанными размерами
        removeAllDots();
        addDotsBetweenStepsIcons();
    });
});

/**
 * Добавляет точки между пунктами оформления заказа
 */
function addDotsBetweenStepsIcons() {
    const steps = document.querySelectorAll('.js-step');
    const stepsCount = steps.length;
    if (stepsCount === 0) return;

    setWidthForSteps(steps, stepsCount);

    // Высчитываем расстояние между каждым из пунктов, получаем необходимое количество точек,
    // формируем верстку и вставляем на страницу для отрисовки
    for (let i = 0; i < stepsCount; i++) {
        const step = steps[i];
        const nextStep = steps[i + 1];
        if (!nextStep) break;
        const icon = step.querySelector('.js-step-icon');
        const nextIcon = nextStep.querySelector('.js-step-icon');
        const coordRightBorderIcon = icon.getBoundingClientRect().right;
        const coordLeftBorderNextIcon = nextIcon.getBoundingClientRect().left;
        const distanceBetweenIcons = coordLeftBorderNextIcon - coordRightBorderIcon;
        const dotsCount = Math.floor(distanceBetweenIcons / 25);
        if (dotsCount === 0) return;
        const dots = createDots(dotsCount);
        const dotsPositionLeft = icon.offsetWidth - 5;
        dots.style.width = distanceBetweenIcons + 'px';
        dots.style.left = dotsPositionLeft + 'px';
        icon.append(dots);
    }
}

/**
 * Формирует верстку блока с точками между пунктами оформления заказа
 * @param {number} count - количество точек (сколько должно быть между пунктами)
 * @returns {HTMLElement} - Блок с точками для вставки на страницу
 */
function createDots(count) {
    const dotsContainer = document.createElement('div');
    const dotElement = document.createElement('div');
    dotsContainer.classList.add('steps__dots', 'js-step-dots');
    dotElement.classList.add('steps__dot');
    dotElement.innerHTML = '<svg viewBox="0 0 7 6" xmlns="http://www.w3.org/2000/svg"><circle cx="3.01111" cy="3" r="3"/></svg>';
    for (let i = 0; i < count; i++) {
        if (i === 0) {
            dotsContainer.append(dotElement);
            continue;
        }
        dotsContainer.append(dotElement.cloneNode(true));
    }
    return dotsContainer;
}

/**
 * Указывает максимальную ширину для каждого пункта оформления заказа
 * @param {HTMLCollection} steps - все пункты оформления заказа в блоке
 * @param {number} count - их количество
 */
function setWidthForSteps(steps, count) {
    const widthStep = 82 / count;
    for (let i = 0; i < count; i++) {
        steps[i].style.width = widthStep + '%';
    }
}

/**
 * Удаляет все точки между пунктами оформления заказа на странице
 */
function removeAllDots() {
    const dots = document.querySelectorAll('.js-step-dots');
    for (const dotContainer of dots) {
        dotContainer.remove();
    }
}
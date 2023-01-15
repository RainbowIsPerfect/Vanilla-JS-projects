const accordionListItems = document.querySelectorAll('.accordion__list-item');
const accordionBodies = document.querySelectorAll('.accordion__body');
const accordionChevron = document.querySelectorAll('.accordion__chevron-icon');

accordionListItems.forEach(el => el.addEventListener('click', e => {
    const currentButton = e.currentTarget;
    const currentBody = currentButton.querySelector('.accordion__body');
    const currentChevron = currentButton.querySelector('.accordion__chevron-icon');
    const currentHeight = `${currentBody.scrollHeight}px`;

    accordionBodies.forEach(e => {
        if (e !== currentBody) {
            e.classList.add('accordion__body--hidden');
            e.style.maxHeight = null;
        }
    });

    accordionChevron.forEach(e => {
        if (e !== currentChevron) e.classList.remove('accordion__chevron-icon--opened');
    });
    currentBody.classList.toggle('accordion__body--hidden');
    currentChevron.classList.toggle('accordion__chevron-icon--opened');
    if (currentBody.classList.contains('accordion__body--hidden')) {
        currentBody.style.maxHeight = null;
    } else {
        currentBody.style.maxHeight = currentHeight;
    }
}));
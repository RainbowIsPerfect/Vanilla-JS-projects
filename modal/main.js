const modals = document.querySelectorAll('.modal-window');
const buttons = document.querySelectorAll('.card__button');

modals.forEach(modal => modal.addEventListener('click', openModal));
buttons.forEach(button => button.addEventListener('click', readMore));

function readMore() {
    const textContent = this.previousElementSibling;
    const newModal = new CreateModal(textContent);
    newModal.createElement();
    newModal.addClickEvent();
}

function openModal() {
    const newModal = new CreateModal(this);
    newModal.createElement();
    newModal.addClickEvent();
}

class CreateModal {
    constructor(element) {
        this.element = element;
    }
    createElement() {
        const modal = `<div class="modal">
                            <div class="modal__container">
                                <div class="modal__content">
                                    <button class="modal__close-button">
                                        <img class="modal__close-button-image" src="img/close-button.svg" alt="close button">
                                    </button>
                                </div>
                            </div>
                        </div>`;
        document.body.insertAdjacentHTML('afterbegin', modal);
        let i = this.element.cloneNode(true);
        if (this.element.tagName === 'IMG') {
            i.removeAttribute('class');
            i.classList.add('modal__image');
        } else {
            i.classList.add('modal__text');
        }
        document.querySelector('.modal__close-button').insertAdjacentElement('afterend', i);
        document.body.classList.add('overflow');
    }
    addClickEvent() {
        const currentModal = document.body.querySelector('.modal');
        currentModal.addEventListener('click', event => {
            if (event.target.classList.contains('modal__close-button') || event.target.closest('.modal__content') === null) {
                currentModal.remove();
                document.body.classList.remove('overflow');
            }
        });
    }
}

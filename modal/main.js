const cardImages = document.querySelectorAll('.card__image');
const buttons = document.querySelectorAll('.card__button');

cardImages.forEach(image => image.addEventListener('click', openModal));
buttons.forEach(button => button.addEventListener('click', openReadMore));

function openReadMore() {
    const textContent = this.previousElementSibling;
    const newModal = new CreateModal(textContent);
    newModal.createElement();
}

function openModal() {
    const newModal = new CreateModal(this);
    newModal.createElement();
}

class CreateModal {
    constructor(element) {
        this.element = element;
    }
    createElement() {
        this.insertElement();
        this.setBodyStyle();
        this.addClickEvent();
    }
    insertElement() {
        const modal = this.createHTML();
        const nodeClone = this.element.cloneNode(true);
        nodeClone.style.margin = "0px";
        this.element.tagName === "IMG" ? this.createImageModal(nodeClone) : this.createTextModal(nodeClone);
        document.body.insertAdjacentHTML('afterbegin', modal);
        document.querySelector('.modal__close-button').insertAdjacentElement('afterend', nodeClone);
        document.querySelector('.modal__close-button').focus();
    }
    setBodyStyle() {
        const scrollWidth = `${window.innerWidth - window.document.documentElement.clientWidth}px`;
        document.body.style.paddingRight = scrollWidth;
        document.body.style.overflow = "hidden";
    }
    createTextModal(element) {
        element.classList.add('modal__text');
    }
    createImageModal(element) {
        element.removeAttribute('class');
        element.classList.add('modal__image');
    }
    createHTML() {
        const modal = `<div class="modal">
                            <div class="modal__container">
                                <div class="modal__content">
                                    <button class="modal__close-button">
                                        <img class="modal__close-button-image" src="img/close-button.svg" alt="close button">
                                    </button>
                                </div>
                            </div>
                        </div>`;
        return modal;
    }
    addClickEvent() {
        const currentModal = document.body.querySelector('.modal');
        currentModal.addEventListener('click', this.closeModalEvent);
    }
    closeModalEvent(event) {
        if (event.target.classList.contains('modal__close-button') || event.target.closest('.modal__content') === null) {
            document.querySelector('.modal').remove();
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
        }
    }
}

export class Modal {
    constructor(options) {
        this.default = {
            background: {
                backdropBlur: 1,
                backgroundOpacity: 0.8,
            },
            animation: {
                animationType: "fadeIn",
                animationDuration: 0.3,
            },
        }
        this.animations = ["none", "fadeIn", "zoomIn", "fadeInDown", "fadeInUp", "bounce"];
        this.options = {...this.default, ...options};
    }

    setOptions() {
        let properties = "";
        if (this.options.background.backdropBlur) properties += `backdrop-filter: blur(${this.options.background.backdropBlur}px);`;
        if (this.options.background.backdropBlur) properties += `background-color: rgba(0, 0, 0, ${this.options.background.backgroundOpacity})`;
        this.overlay.setAttribute('style', properties);
        this.overlay.querySelectorAll('.modal__content').forEach(content => {
            if (this.animations.includes(this.options.animation.animationType) && this.options.animation.animationType !== "none") {
                content.classList.add(this.options.animation.animationType);
                content.style.setProperty('--time', `${this.options.animation.animationDuration}s`);
            }
        })
    }

    open(event) {
        this.currentModal = document.querySelector(`[data-modal="${event.target.dataset.trigger}"]`);
        this.currentModal.classList.add('modal__content--active');
        document.body.classList.add('modal-enabled');
        this.overlay.classList.add('modal--active');
    }

    close(event) {
        if (!event.target.closest('.modal__content')) {
            this.currentModal.classList.remove('modal__content--active');
            document.body.classList.remove('modal-enabled');
            this.overlay.classList.remove('modal--active');
        }
    }

    events() {
        this.triggers.forEach(trigger => trigger.addEventListener('click', event => this.open(event)));
        this.overlay.addEventListener('click', (event) => this.close(event));
    }

    init() {
        this.overlay = document.querySelector('.modal');
        this.triggers = document.querySelectorAll('[data-trigger]');
        this.events();
        this.setOptions();
    }
}


export class CustomModal extends Modal {
    constructor(options) {
        super();
        this.options = {...this.default, ...options};
    }

    createModalMarkup() {
        const modalHTML = `
                        <div class="modal">
                            <div class="modal__container">
                            </div>
                        </div>`;
        document.body.insertAdjacentHTML('afterbegin', modalHTML);
    }

    setContent(content, data) {
        const modalContent = `<div class="modal__content" data-modal="${data}">${content}</div>`;
        const modal = document.querySelector('.modal');
        if (modal) {
            modal.children[0].insertAdjacentHTML('beforeend', modalContent);
        } else {
            this.createModalMarkup();
            modal.children[0].insertAdjacentHTML('beforeend', modalContent);
        }
    }
}
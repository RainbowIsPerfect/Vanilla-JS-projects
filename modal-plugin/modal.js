class Modal {
    constructor(options) {
        this.default = {
            backdropBlur: false,
            animated: false,
        }
        this.options = {...this.default, ...options};
    }
    setClasses() {
        const classes = [];
        if (this.options.backdropBlur) classes.push("modal--animated");
        if (this.options.animated) classes.push("modal--blured");
        this.modals.forEach(modal => modal.classList.add(...classes));
    }
    open(e) {
        this.modal = document.querySelector(`[data-modal="${e.target.dataset.trigger}"]`);
        if (this.modal) {
            this.modal.classList.add('modal--active');
            document.body.classList.add('modal-enabled');
        }
    }
    close(e) {
        if (e.target.closest('.modal__content') === null) {
            this.modal.classList.remove('modal--active');
            document.body.classList.remove('modal-enabled');
        }
    }
    setTriggers() {
        if (this.triggers.length === 0) {
            console.warn(`Triggers not found`);
        } else {
            this.triggers.forEach(trigger => trigger.addEventListener('click', e => this.open(e)));
        }
    }
    setModals() {
        if (this.modals.length === 0) {
            console.warn(`Modals not found`);
        } else {
            this.modals.forEach(modal => modal.addEventListener('click', e => this.close(e)));
        }
    }
    init() {
        this.modals = document.querySelectorAll("[data-modal]");
        this.triggers = document.querySelectorAll("[data-trigger]");
        this.setTriggers();
        this.setModals();
        this.setClasses();
    }
}

export default Modal;
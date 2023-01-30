class Modal {
    constructor(options) {
        this.default = {
            backdropBlur: false,
            animationType: "fadeIn",
            animationDuration: 0.3,
        }
        this.animations = ["none", "fadeIn", "zoomIn", "fadeInDown", "fadeInUp", "bounce"];
        this.options = {...this.default, ...options};
        this.init();
    }
    setModalOverlayClasses() {
        const overlayClasses = [];
        if (this.options.backdropBlur === true) overlayClasses.push("modal--blured");
        return overlayClasses.length === 0 ? null : this.modalOverlay.classList.add(...overlayClasses);
    }
    setModalWindowClasses() {
        const windowClasses = [];
        if (typeof this.options.animationDuration === "number" && this.options.animationType !== "none") {
            this.modals.forEach(modal => modal.style.setProperty('--time', `${this.options.animationDuration}s`));
        }
        if (this.animations.includes(this.options.animationType) && this.options.animationType !== "none") {
            windowClasses.push(this.options.animationType);
        }
        return windowClasses.length === 0 ? null : this.modals.forEach(modal => modal.classList.add(...windowClasses));
    }
    open(e) {
        this.currentModal = this.modals.find(modal => modal.dataset.modal === e.target.dataset.trigger);
        if (this.currentModal) {
            this.handleActiveClasses();
        }
    }
    close(e) {
        if (e.target.closest('.modal__content') === null) {
            this.handleActiveClasses(false);
        }
    }
    handleActiveClasses(open = true) {
        if (open) {
            this.modalOverlay.classList.add('modal--active');
            this.currentModal.classList.add('modal__content--active');
            document.body.classList.add('modal-enabled');
        } else {
            this.modalOverlay.classList.remove('modal--active');
            this.currentModal.classList.remove('modal__content--active');
            document.body.classList.remove('modal-enabled');
        }
    }
    setTriggers() {
        this.triggers.forEach(trigger => trigger.addEventListener('click', e => this.open(e)));
    }
    setModal() {
        this.modalOverlay.addEventListener('click', e => this.close(e));
    }
    init() {
        this.modalOverlay = document.querySelector('.modal');
        this.modals = [...this.modalOverlay.querySelectorAll('[data-modal]')];
        this.triggers = document.querySelectorAll("[data-trigger]");
        this.setTriggers();
        this.setModal();
        this.setModalOverlayClasses();
        this.setModalWindowClasses();
    }
}
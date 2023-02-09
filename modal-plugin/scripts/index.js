import {CustomModal, Modal} from "../dist/modal.min.js";

const newModal = new Modal({
    animation: {
        animationType: "fadeInUp",
        animationDuration: 0.5,
    },
    background: {
        backdropBlur: 1,
        backgroundOpacity: 0.8,
    }
});

newModal.init();

// const cmodal = new CustomModal({
//     animation: {
//         animationType: "fadeInUp",
//         animationDuration: 1.5,
//     },
//     background: {
//         backdropBlur: 1,
//         backgroundOpacity: 0.6,
//     }
// })

// cmodal.createModalMarkup();
// cmodal.setContent('<p>Content</p>', 3);
// cmodal.init();
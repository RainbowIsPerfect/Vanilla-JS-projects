const newModal = new Modal({
    backdropBlur: true,
    animationType: "bounce",
    animationDuration: 0.3,
});

newModal.setContent(`<p class="p">New p New p New p New p New p New p New p </p>`, 1);
newModal.setContent(`<p class="p">New p2 New p2 New p2 New p2 New p2 New p2</p>`, 2);

newModal.init();



// newModal.initHTMl();

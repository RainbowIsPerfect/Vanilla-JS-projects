const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
const optionsSelect = document.querySelector('.app__select-style');
const optionsList = Array.from(document.querySelector('.app__select-style').children);
const colorSelect = document.querySelector('.app__select--color');
const bgColorSelect = document.querySelector('.app__select--bgcolor');
const widthSelect = document.querySelector('.app__select-width'); 

const width = canvas.offsetWidth;
const height = canvas.offsetHeight;

window.addEventListener('load', () => {
    canvas.width = width;
    canvas.height = height;
})

bgColorSelect.addEventListener('input', fillBg);
canvas.addEventListener('mousedown', mousedown);
canvas.addEventListener('mouseout', mouseup);
canvas.addEventListener('mouseup', mouseup);
canvas.addEventListener('mousemove', draw);

let isDraw = false;

function fillBg() {
    ctx.fillStyle = bgColorSelect.value;
    ctx.fillRect(0,0,width,height);
}

function draw(e) {
    if (isDraw) {
        ctx.strokeStyle = colorSelect.value;
        ctx.lineCap = optionsSelect.value;
        if (widthSelect.value > 20 || widthSelect.value < 1) {
            widthSelect.value = 10;
        } 
        ctx.lineWidth = widthSelect.value;
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }
}

function mousedown(e) {
    isDraw = true;
    ctx.beginPath();
    draw(e);
}

function mouseup() {
    isDraw = false;
}



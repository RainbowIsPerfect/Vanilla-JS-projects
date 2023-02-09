const colorContainers = document.querySelectorAll('.color-container');
const button = document.querySelector('.button');
const outputs = document.querySelectorAll('.color-output');
const tooltip = document.querySelector('.tooltip');

const colorValuesArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

let timeout;

window.addEventListener('DOMContentLoaded', applyColor);
button.addEventListener('click', applyColor);
colorContainers.forEach(container => container.addEventListener('click', copyColor));
tooltip.addEventListener('click', () => tooltip.classList.remove('tooltip--active'));

function getRandomHexColor() {
    let hexColor = '#';
    for (let i = 0; i < 6; i++) {
        hexColor += colorValuesArray[Math.floor(Math.random() * (colorValuesArray.length))];
    }
    return hexColor;
}

function applyColor() {
    outputs.forEach(el => {
        el.textContent = getRandomHexColor();
        el.closest('button').style.backgroundColor = `${el.textContent}`;
    })
}

function copyColor() {
    if (typeof timeout === 'number') window.clearTimeout(timeout);
    const currentColor = this.children[0].textContent;
    navigator.clipboard.writeText(currentColor);
    tooltip.classList.add('tooltip--active');
    timeout = window.setTimeout(() => {
        tooltip.classList.remove('tooltip--active');
    }, 2000);
}
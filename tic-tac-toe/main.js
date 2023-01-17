const gameField = document.querySelector('.game__field');
const buttonsArray = [...gameField.children];
const xMarkCounter = document.querySelector('[data-figure="xmark"]');
const circleCounter = document.querySelector('[data-figure="circle"]');
const tieCounter = document.querySelector('[data-figure="tie"]');
const resetFieldButton = document.querySelector('.game__reset-field-button');
const resetScoreButton = document.querySelector('.game__reset-score-button');

const winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
let isCirclesTurn = false;
let fieldArray = [];

window.addEventListener('DOMContentLoaded', getFromLocalStorage);
window.addEventListener('DOMContentLoaded', setClasses);
resetFieldButton.addEventListener('click', resetGame);
resetScoreButton.addEventListener('click', resetScore);
buttonsArray.forEach(button => button.addEventListener('click', addFigure));

function addFigure(event) {
    const currentButton = event.target;
    if (isCirclesTurn) {
        currentButton.insertAdjacentHTML('afterbegin', createImageTag("circle"));
        isCirclesTurn = false;
        currentButton.setAttribute('disabled', true);
        setClasses();
    } else {
        currentButton.insertAdjacentHTML('afterbegin', createImageTag("xmark"));
        isCirclesTurn = true;
        currentButton.setAttribute('disabled', true);
        setClasses();
    }
    checkWinComb(currentButton, isCirclesTurn);
}

function checkWinComb(currentButton, isCirclesTurn) {
    const currentButtonIndex = currentButton.dataset.index;
    isCirclesTurn ? fieldArray[currentButtonIndex] = "O" : fieldArray[currentButtonIndex] = "X";
    for (let i = 0; i < winningCombinations.length; i++) {
        const [first, second, third] = winningCombinations[i];
        const condition = fieldArray[first] === fieldArray[second] && fieldArray[first] === fieldArray[third] && fieldArray[first] !== undefined;
        if (condition) {
            setWinner(isCirclesTurn);
            break;
        }
    }
    checkTie();
}

function checkTie() {
    const state = buttonsArray.every(button => button.children[0] !== undefined);
    if (state) {
        tieCounter.textContent = +tieCounter.textContent + 1;
        saveToLocalStorage();
        resetGame();
    }
}

function setWinner(winner) {
    if (winner) {
        xMarkCounter.textContent = +xMarkCounter.textContent + 1;
        resetGame();
    } else {
        circleCounter.textContent = +circleCounter.textContent + 1;
        resetGame();
    }
    saveToLocalStorage();
}

function createImageTag(figure) {
    return `<img class="game__image" src="img/${figure}.svg" alt="${figure}">`;
}

function resetGame() {
    buttonsArray.forEach(button => {
        if (button.children.length !== 0) button.querySelector('.game__image').remove();
        button.removeAttribute('disabled');
        isCirclesTurn = false;
        setClasses();
    });
    fieldArray = [];
}

function saveToLocalStorage() {
    localStorage.setItem('circles', circleCounter.textContent);
    localStorage.setItem('xmarks', xMarkCounter.textContent);
    localStorage.setItem('tie', tieCounter.textContent);
}

function getFromLocalStorage() {
    const xMarks = localStorage.getItem('xmarks');
    const circles = localStorage.getItem('circles');
    const tie = localStorage.getItem('tie');
    if (xMarks !== null && circles !== null && tie !== null) {
        circleCounter.textContent = circles;
        xMarkCounter.textContent = xMarks;
        tieCounter.textContent = tie;
    }
}

function setClasses() {
    if (isCirclesTurn) {
        buttonsArray.forEach(button => {
            if (button.disabled) {
                button.classList.remove('game__button--xmark', 'game__button--circle');
            } else {
                button.classList.remove('game__button--xmark');
                button.classList.add('game__button--circle');
            }
        });
    } else {
        buttonsArray.forEach(button => {
            if (button.disabled) {
                button.classList.remove('game__button--xmark', 'game__button--circle');
            } else {
                button.classList.remove('game__button--circle');
                button.classList.add('game__button--xmark');
            }
        })
    }
}

function resetScore() {
    localStorage.removeItem('circles');
    localStorage.removeItem('xmarks');
    localStorage.removeItem('tie');
    xMarkCounter.textContent = 0;
    circleCounter.textContent = 0;
    tieCounter.textContent = 0;
}
const gameField = document.querySelector('.game');
const cardList = document.querySelector('.game__cards-list');
const cards = [...cardList.children];
const select = document.querySelector('.select');
const generateButton = document.querySelector('.game__generate-button');
const resetButton = document.querySelectorAll('.game__reset-button');
const winningDisplay = document.querySelector('.winning-menu');
const imageSrc = ["img/img_1.jpg", "img/img_2.jpg", "img/img_3.jpg", "img/img_5.jpg", "img/img_6.jpg", "img/img.png"];

class MemoryGame {
    constructor(srcset, select, display, game) {
        this.srcset = srcset;
        this.select = select;
        this.display = display;
        this.game = game;
        this.arr = [];
        this.cards = [];
    }
    addClass(card) {
        this.arr.push(card);
        card.classList.add('card--active');
        this.removeClass(false);
    }
    removeClass(reset) {
        if (reset) {
            this.cards.forEach(card => card.classList.remove('card--active', 'card--done'));
        } else {
            if (this.arr.length === 2) {
                if (this.checkSameSrc()) {
                    this.cards.forEach(card => card.classList.remove('card--active'));
                } else {
                    this.handleClick(true);
                    setTimeout(() => {
                        this.cards.forEach(card => card.classList.remove('card--active'));
                        this.handleClick(false);
                    }, 800);
                }
                this.arr = [];
            }
        }
    }
    checkSameSrc() {
        if (this.arr[0].children[1].children[0].src === this.arr[1].children[1].children[0].src) {
            this.arr[0].classList.add('card--done');
            this.arr[1].classList.add('card--done');
            this.checkWin();
            return true;
        }
        return false;
    }
    handleClick(block) {
        let option = block ? "none" : "";
        this.cards.forEach(card => card.style.pointerEvents = option);
    }
    checkWin() {
        const isWin = this.cards.every(card => card.classList.contains('card--done'));
        if (isWin) {
            this.display.classList.add('winning-menu--active');
            this.game.classList.add('game--inactive');
        }
    }
    randomize() {
        const value = this.select.value.split('x').reduce((acc, curr) => acc * curr) / 2;
        const src = [...this.srcset].sort(() => Math.random() - 0.5);
        let result = [];
        for (let i = 0; i < value; i++) {
            result[i] = src[i];        
        }
        return result.concat(result).sort(() => Math.random() - 0.5);
    }
    createCards() {
        this.resetCards(false);
        const srcArray = this.randomize();
        for (let i = 0, tabindex = 4; i < srcArray.length; i++, tabindex++) {
            const cardHTML = `<li class="game__card card" tabindex="${tabindex}">
                                <div class="card__view card__front">
                                    <img class="card__icon" src="img/question-icon.svg" alt="question-mark">
                                </div>
                                <div class="card__view card__back">
                                    <img class="card__image" src="${srcArray[i]}" alt="card-image">
                                </div>
                            </li>`;
            cardList.insertAdjacentHTML('beforeend', cardHTML);
        }
        this.cards = [...document.querySelectorAll('.card')];
        this.cards.forEach(card => card.addEventListener('click', (e) => {
            newGame.addClass(e.currentTarget)
        }));
    }
    resetCards(notFull) {
        if (notFull) {
            this.removeClass(true);
            const srcArray = this.randomize();
            for (let i = 0; i < this.cards.length; i++) {
                this.cards[i].children[1].children[0].src = srcArray[i];
            }
        } else {
            this.cards = [...document.querySelectorAll('.card')];
            this.cards.forEach(card => card.remove());
        }
        this.game.classList.remove('game--inactive');
        this.display.classList.remove('winning-menu--active');
    }
}

const newGame = new MemoryGame(imageSrc, select, winningDisplay, gameField);

window.addEventListener('DOMContentLoaded', () => newGame.createCards());
generateButton.addEventListener('click', () => newGame.createCards());
resetButton.forEach(button => button.addEventListener('click', () => newGame.resetCards(true)));
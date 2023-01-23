const gameField = document.querySelector('.game');
const cardList = document.querySelector('.game__cards-list');
const cards = [...cardList.children];
const select = document.querySelector('.select');
const generateButton = document.querySelector('.game__generate-button');
const resetButton = document.querySelectorAll('.game__reset-button');
const winningDisplay = document.querySelector('.winning-menu');
const imageSrc = ["img/img_1.jpg", "img/img_2.jpg", "img/img_3.jpg", "img/img_5.jpg", "img/img_6.jpg", "img/img.png"];

class MemoryGame {
    constructor(srcset, cardsList, select, display, game) {
        this.srcset = srcset;
        this.cardsList = cardsList;
        this.select = select;
        this.display = display;
        this.game = game;
        this.arr = [];
        this.cards = [];
        this.transition;
        this.timer;
    }
    createCards() {
        const srcArray = this.randomize();
        for (let i = 0, tabindex = 4; i < srcArray.length; i++, tabindex++) {
            this.cardsList.insertAdjacentHTML('beforeend', this.createCard(tabindex, srcArray[i], 0.8));
        }
        this.cards = [...document.querySelectorAll('.card')];
        this.addClickEvent();
    }
    createCard(tabindex, picture, transitionTime = 0.2, timingFunction = "ease") {
        this.transition = transitionTime;
        const cardStyle = `transition: transform ${transitionTime}s ${timingFunction};`
        const cardHTML = `<li class="game__card card" style="${cardStyle}" tabindex="${tabindex}">
                            <div class="card__view card__front">
                                <img class="card__icon" src="img/question-icon.svg" alt="question-mark">
                            </div>
                            <div class="card__view card__back">
                                <img class="card__image" src="${picture}" alt="card-image">
                            </div>
                        </li>`;
        return cardHTML;
    }
    addClasses(activeClass, card) {
        if (activeClass) {
            this.arr.push(card);
            card.classList.add('card--active');
            this.removeClass();
        } else {
            this.arr[0].classList.add('card--done');
            this.arr[1].classList.add('card--done');
            this.checkWin();
        }
    }
    removeClass() {
        if (this.arr.length === 2) {
            if (!this.checkSameSrc()) {
                this.handleClick();
                this.timeout(true, 1000);
            }
            this.arr = [];
        }
    }
    removeAllCardClasses() {
        this.cards.forEach(card => card.classList.remove('card--active', 'card--done'));
    }
    timeout(start, ms = 800) {
        if (start) {
            this.timer = setTimeout(() => {
                this.cards.forEach(card => card.classList.remove('card--active'));
                this.handleClick(false);
            }, ms);
        } else {
            clearTimeout(this.timer);
        }
    }
    checkSameSrc() {
        if (this.arr[0].querySelector('.card__image').src === this.arr[1].querySelector('.card__image').src) {
            this.addClasses(false);
            return true;
        }
        return false;
    }
    handleClick(blockClick = true) {
        let option = blockClick ? "none" : "";
        this.cards.forEach(card => card.style.pointerEvents = option);
    }
    checkWin() {
        if (this.cards.every(card => card.classList.contains('card--done'))) {
            this.display.classList.add('winning-menu--active');
            this.game.classList.add('game--inactive');
        }
    }
    randomize(selectedValue = true) {
        const src = [...this.srcset].sort(() => Math.random() - 0.5);
        let result = [];
        for (let i = 0; i < this.checkAmount(selectedValue); i++) {
            result[i] = src[i];
        }
        return [...result, ...result].sort(() => Math.random() - 0.5);
    }
    generate() {
        if (this.checkAmount(true) * 2 === this.cards.length) {
            this.reset();
        } else {
            this.clearAll();
            this.createCards();
        }
    }
    checkAmount(current) {
        return current ? this.select.value.split('x').reduce((acc, curr) => acc * curr) / 2 : this.cards.length / 2;
    }
    reset() {
        if (this.cards.length !== 0) {
            const srcArray = this.randomize(false);
            this.removeAllCardClasses();
            setTimeout(() => {
                for (let i = 0; i < this.cards.length; i++) {
                    this.cards[i].querySelector('.card__image').src = srcArray[i];
            }
            }, this.transition * 1000)
            this.timeout(false);
            this.handleClick(false);
            this.arr = [];
        }
        this.game.classList.remove('game--inactive');
        this.display.classList.remove('winning-menu--active');
    }
    clearAll() {
        this.cards.forEach(card => card.remove());
        this.reset();
    }
    addClickEvent() {
        this.cards.forEach(card => card.addEventListener('click', (e) => newGame.addClasses(true, e.currentTarget)));
    }
}

const newGame = new MemoryGame(imageSrc, cardList, select, winningDisplay, gameField);

window.addEventListener('DOMContentLoaded', () => newGame.createCards());
generateButton.addEventListener('click', () => newGame.generate());
resetButton.forEach(button => button.addEventListener('click', () => newGame.reset()));
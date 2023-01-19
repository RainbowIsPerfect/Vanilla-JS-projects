const outputCurr = document.querySelector('.output').children[1];
const outputPrev = document.querySelector('.output').children[0];
const numButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operator]');
const equalButton = document.querySelector('[data-equal]');
const delButton = document.querySelector('[data-del]');
const clearButton = document.querySelector('[data-clear]');

class Calcutator {
    constructor(current, previous) {
        this.current = current;
        this.previous = previous;
        this.clear();
    }
    addNumber(value) {
        if (value === "." && this.numOne.includes(".") || this.numOne[0] === "0" && value === "0") return;
        +this.numOne[0] === 0 && value !== "0" ? this.numOne = value : this.numOne += value;
        this.checkZero();
    }
    addOperator(value) {
        if (this.numOne === "" || this.numOne === ".") return;
        this.operator = value;
        if (this.numOne !== "" && this.numTwo !== "") this.calculate();
        this.numTwo = this.numOne;
        this.numOne = "";
    }
    calculate() {
        let result;
        const prev = parseFloat(this.numTwo);
        const curr = parseFloat(this.numOne);
        if (isNaN(prev) || isNaN(curr)) return;
        switch (this.operator) {
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '*':
                result = prev * curr;
                break;
            case '/':
                result = prev / curr;
                break;
            case '%':
                result = prev % curr;
                break;
            default:
                return;
        }
        this.numOne = Number(result.toFixed(3)).toString();
        this.operator = "";
        this.numTwo = "";
    }
    checkZero() {
        if (this.numOne == "0" && this.operator !== '') {
            equalButton.setAttribute("disabled", true);
        } else {
            equalButton.removeAttribute("disabled");
        }
    }
    clear() {
        this.numOne = "";
        this.numTwo = "";
        this.operator = "";
    }
    delete(){
        this.numOne = this.numOne.toString().slice(0, -1);
    }   
    updateOutput() {
        this.current.textContent = this.numOne;
        this.previous.textContent = this.numTwo;
        if (this.operator !== "") {
            this.previous.textContent = `${this.numTwo} ${this.operator}`;
        } 
    }
}

const newCalculator = new Calcutator(outputCurr, outputPrev);

numButtons.forEach(button => button.addEventListener('click', () => {
    newCalculator.addNumber(button.textContent);
    newCalculator.updateOutput();
}));
clearButton.addEventListener('click', () => {
    newCalculator.clear();
    newCalculator.updateOutput();
});
operationButtons.forEach(button => button.addEventListener('click', () => {
    newCalculator.addOperator(button.textContent);
    newCalculator.updateOutput();
}));
equalButton.addEventListener('click', () => {
    newCalculator.calculate();
    newCalculator.updateOutput();
});
delButton.addEventListener('click', () => {
    newCalculator.delete();
    newCalculator.updateOutput();
});
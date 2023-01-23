const output = document.querySelector('.output__text');
const gradientSelect = document.querySelector('.app__select--gradient');
const colorsAmountSelect = document.querySelector('.app__select--colors');
const generateButton = document.querySelector('.app__button');
const copyButton = document.querySelector('.output__copy-button');
const colorPreviewContainer = document.querySelector('.app__color-preview');

class ColorGenerator {
    constructor(output, button, copyButton, selectGradientType, selectColors, colorContainer) {
        this.output = output;
        this.button = button;
        this.copyButton = copyButton;
        this.selectGradientType = selectGradientType;
        this.selectColors = selectColors;
        this.colorContainer = colorContainer;
        this.gradients = ['linear-gradient', 'radial-gradient'];
        this.radialGradientOptions = {
            shape: ['circle', 'ellipse'],
            size: ['closest-side', 'farthest-side', 'closest-corner', 'farthest-corner'],
        };
        this.cssGradient;
    }
    generateHex() {
        let hex = "#";
        for (let i = 0; i < 6; i++) {
            hex += this.generateRandomValue(0, 15).toString(16);
        }
        return hex;
    }
    selectGradient(value) {
        let gradient = value === 'random' ? this.gradients[this.generateRandomValue(0, 1)] : value;
        switch (gradient) {
            case ('linear-gradient'):
                return this.linearGradientSettings(gradient);
            case ('radial-gradient'):
                return this.radialGradientSetting(gradient);
        }
    }
    linearGradientSettings(gradient) {
        gradient += `(${this.generateRandomValue(0, 360)}deg`;
        return gradient;
    }
    radialGradientSetting(gradient) {
        const currentShape = this.radialGradientOptions.shape[this.generateRandomValue(0, this.radialGradientOptions.shape.length - 1)];
        const currentSize = this.radialGradientOptions.size[this.generateRandomValue(0, this.radialGradientOptions.size.length - 1)];
        if (currentShape === 'ellipse') {
            gradient += `(${currentSize} at ${this.generateRandomValue(0, 100)}% ${this.generateRandomValue(0, 100)}%`;
        } else {
            gradient += `(${currentShape} ${currentSize} at ${this.generateRandomValue(0, 100)}% ${this.generateRandomValue(0, 100)}%`;
        }
        return gradient;
    }
    generateRandomValue(min, max) {
        return Math.floor(min + Math.random() * (max + 1 - min));
    }
    createGradient(repeat = 2) {
        let colors = '';
        for (let i = 0; i < repeat; i++) {
            colors += `, ${this.generateHex()}`;
        }
        const fullGradient = `${this.selectGradient(this.selectGradientType.value)}${colors})`;
        return fullGradient;
    }
    outputGradient() {
        this.cssGradient = this.createGradient(this.selectColors.value);
        this.output.textContent = `background: ${this.cssGradient};`;
        this.output.textContent += `\nbackground: -webkit-${this.cssGradient};`;
        this.colorContainer.style.backgroundImage = this.cssGradient;
    }
    copyToClipboard() {
        if (this.output.textContent !== "") {
            const originalText = this.copyButton.textContent;
            navigator.clipboard.writeText(this.output.textContent);
            this.copyButton.textContent = 'Copied!';
            setTimeout(() => {
                this.copyButton.textContent = originalText;
            }, 1000)
        } 
    }
    setEvents() {
        this.button.addEventListener('click', () => this.outputGradient());
        this.copyButton.addEventListener('click', () => this.copyToClipboard());
    }
}

const newColorGenerator = new ColorGenerator(output, generateButton, copyButton, gradientSelect, colorsAmountSelect, colorPreviewContainer);

newColorGenerator.setEvents();
const button = document.querySelector('.app__option-button');
const checkBoxes = document.querySelectorAll('.app__option-checkbox');
const rangeInput = document.querySelector('.app__option-range');
const output = document.querySelector('.app__output');
const copyButton = document.querySelector('.app__copy'); 
const toolTip = document.querySelector('.app__tooltip');
const passwordLengthField = document.querySelector('.app__password-length');  

button.addEventListener('click', generatePassword);
copyButton.addEventListener('click', copyToClipboard);
rangeInput.addEventListener('input', showCurrentLength);
window.addEventListener('load', showCurrentLength);

const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const upperCase = lowerCase.toUpperCase();
const special = "!@#$%^&*()~_+-";
const numbers = "1234567890";

function generatePassword() {
    let currentVariables = "";
    let generatedPassword = "";
    const passwordLength = +rangeInput.value;
    checkBoxes.forEach(checkbox => {
        if (checkbox.checked) {
            switch (checkbox.id) {
                case "lowercase":
                    currentVariables += lowerCase;
                    break;
                case "uppercase":
                    currentVariables += upperCase;
                    break;
                case "special":
                    currentVariables += special;
                    break;
                case "numbers":
                    currentVariables += numbers;
                    break;
            }
        }
    })
    if (currentVariables) {
        for (let i = 0; i < passwordLength; i++) {
            generatedPassword += currentVariables[Math.floor(Math.random() * currentVariables.length)]
        }
        output.textContent = generatedPassword;
    } else {
        output.textContent = "";
        output.placeholder = "Select options"
    }
}

function copyToClipboard() {
    if (output.textContent) {
        navigator.clipboard.writeText(output.textContent);
        toolTip.classList.remove('app__tooltip--hidden');
        window.setTimeout(() => {
            toolTip.classList.add('app__tooltip--hidden');
        }, 2000)
    } else {
        output.placeholder = "Nothing to copy"
    }
}

function showCurrentLength() {
    passwordLengthField.textContent = rangeInput.value;
}
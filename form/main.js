const form = document.querySelector('.sign-up-form');
const submitButton = document.querySelector('.sign-up-form__button');
const inputFields = Array.from(document.querySelectorAll('.sign-up-form__input'));
const passwordField = document.querySelector('.sign-up-form__field--password');
const passwordInput = document.querySelector('.sign-up-form__input--password');
const showPasswordButton = document.querySelectorAll('.sign-up-form__show-password-button');

window.addEventListener('load', () => formValidation())
form.addEventListener('mouseover', () => formValidation())

inputFields.forEach(element => element.addEventListener('change', e => {
    const label = e.target.nextElementSibling;
    if (e.target.value !== '') {
        label.classList.add('sign-up-form__placeholder--active');
        e.target.classList.add('sign-up-form__input--active');
    } else {
        label.classList.remove('sign-up-form__placeholder--active');
        e.target.classList.remove('sign-up-form__input--active');
    }
}));

inputFields.forEach(element => element.addEventListener('keyup', e => {
    const label = e.target.nextElementSibling;
    if (e.target.checkValidity() === false && e.target.value !== '') {
        label.classList.add('sign-up-form__placeholder--invalid');
    } else {
        label.classList.remove('sign-up-form__placeholder--invalid');
    }
}));

passwordField.addEventListener('click', e => {
    if (e.target.classList.contains('sign-up-form__show-password-button') || e.target.parentElement.classList.contains('sign-up-form__show-password-button')) {
        showPasswordButton.forEach(e => e.classList.toggle('sign-up-form__show-password-button--disabled'));
        if (passwordInput.getAttribute('type') === 'password') {
            passwordInput.setAttribute('type', 'text');
        } else {
            passwordInput.setAttribute('type', 'password')
        }
    }
})

function formValidation() {
    if (form.checkValidity()) {
        submitButton.classList.remove('sign-up-form__button--disabled');
        submitButton.removeAttribute('disabled', '');
    } else {
        submitButton.classList.add('sign-up-form__button--disabled');
        submitButton.setAttribute('disabled', '');
    }
}
const addTaskButton = document.querySelector('.menu__button');
const tasksLists = document.querySelectorAll('.app__list');
const incompletedTasksList = document.querySelector('.app__list--incompleted');
const completedTasksList = document.querySelector('.app__list--completed');
const newTaskTextContent = document.querySelector('.menu__input');
const completedTasksCounter = document.querySelector('.menu__counter-output--completed');
const incompletedTasksCounter = document.querySelector('.menu__counter-output--incompleted');

window.addEventListener('load', takeDataFromStorage);
addTaskButton.addEventListener('click', buttonEvent);
newTaskTextContent.addEventListener('keypress', enterButton);

tasksLists.forEach(list => list.addEventListener('click', event => {
    const closestListItem = event.target.closest('li');
    const currentText = closestListItem.textContent;
    const currentParent = closestListItem.parentElement;
    const currentParentClassList = currentParent.classList.contains('app__list--completed');
    if (event.target.classList.contains('app__button--delete')) {
        closestListItem.remove();
        setCounters();
        storeTasks();
    }
    if (event.target.classList.contains('app__button--done')) {
        closestListItem.remove();
        if (currentParentClassList) {
            addTask(currentText);
            setCounters();
            storeTasks();
        } else {
            addTask(currentText, completedTasksList, true);
            setCounters();
            storeTasks();
        }
    }
    if (event.target.classList.contains('app__list-item-text')) {
        event.target.setAttribute('contenteditable', 'true')
        event.target.focus();
        event.target.addEventListener('blur', () => {
            event.target.setAttribute('contenteditable', 'false')
        })
    }
}));

function addTask(currentText, location = incompletedTasksList, isDone = false) {
    let classList = 'app__list-item';
    if (isDone) classList += ' app__list-item--done';
    const listItem = `<li class="${classList}">
                        <span class="app__list-item-text" contenteditable="false" spellcheck="false">${currentText}</span>
                        <div class="app__button-container">
                            <button class="app__button app__button--done">
                                <img class="app__button-image" src="img/square-check-solid.svg" alt="">
                            </button>
                            <button class="app__button app__button--delete">
                                <img class="app__button-image" src="img/square-xmark-solid.svg" alt="">
                            </button>
                        </div>
                    </li>`;
    location.insertAdjacentHTML("beforeend", listItem);
}

function setCounters() {
    const incompletelistLength = incompletedTasksList.children.length;
    const completelistLength = completedTasksList.children.length;
    incompletedTasksCounter.textContent = incompletelistLength;
    completedTasksCounter.textContent = completelistLength;
}

function buttonEvent() {
    const currentText = newTaskTextContent.value.trim();
    if (currentText) {
        addTask(currentText);
        setCounters();
        storeTasks();
        newTaskTextContent.value = '';
        newTaskTextContent.focus();
    } else {
        newTaskTextContent.focus();
    }
}

function enterButton(e) {
    if (e.key === 'Enter') {
        buttonEvent();
    }
}

function storeTasks() {
    const incompleteTasksArray = [];
    const completeTasksArray = [];
    const incompletedTasksCount = incompletedTasksList.children.length;
    const completedTasksCount = completedTasksList.children.length;
    for (let i = 0; i < incompletedTasksCount; i++) {
        incompleteTasksArray.push(incompletedTasksList.children[i].children[0].textContent);
    }
    for (let i = 0; i < completedTasksCount; i++) {
        completeTasksArray.push(completedTasksList.children[i].children[0].textContent);
    }
    localStorage.setItem('incompleteTasks', JSON.stringify(incompleteTasksArray));
    localStorage.setItem('completeTasks', JSON.stringify(completeTasksArray));
}

function takeDataFromStorage() {
    const incompleteList = JSON.parse(localStorage.getItem('incompleteTasks'));
    const completeList = JSON.parse(localStorage.getItem('completeTasks'));
    if (incompleteList[0] === undefined && completeList[0] === undefined) {
        addTask('Add new task');
        setCounters();
    } else {
        incompleteList.forEach(el => addTask(el));
        completeList.forEach(el => addTask(el, completedTasksList, true));
        setCounters();
    }
}

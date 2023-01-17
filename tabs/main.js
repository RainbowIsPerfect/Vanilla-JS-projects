const tabsList = document.querySelectorAll('.tabs__button');
const contentList = document.querySelectorAll('.tabs__content');

tabsList.forEach(tab => tab.addEventListener('click', changeTab));

function changeTab() {
    const currentTabDataSet = this.dataset.tab;
    tabsList.forEach(tab => {
        if (tab !== this) {
            tab.classList.remove('tabs__button--active');
        } else {
            this.classList.add('tabs__button--active');
        }
    });
    contentList.forEach(content => {
        if (content.dataset.content === currentTabDataSet) {
            content.classList.remove('tabs__content--hidden');
        } else {
            content.classList.add('tabs__content--hidden');
        }
    });
}
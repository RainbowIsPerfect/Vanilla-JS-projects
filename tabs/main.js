const tabsList = document.querySelectorAll('.tabs__button');
const contentList = document.querySelectorAll('.tabs__content');

tabsList.forEach(tab => tab.addEventListener('click', changeTab));

function changeTab() {
    const currentTabDataSet = this.dataset.tab;
    tabsList.forEach(tab => {
        tab !== this ? tab.classList.remove('tabs__button--active') : this.classList.add('tabs__button--active');
    });
    contentList.forEach(content => {
        content.dataset.content === currentTabDataSet ? content.classList.add('tabs__content--active') : content.classList.remove('tabs__content--active');
    });
}
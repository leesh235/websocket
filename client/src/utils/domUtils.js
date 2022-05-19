export const createDom = (parent, tag, data) => {
    let list = document.getElementById(parent);
    let item = document.createElement(tag);
    item.innerText = data;
    list.appendChild(item);
};

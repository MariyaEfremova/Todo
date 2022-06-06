let addPoint = document.querySelector('.newPoint');
let doings = document.querySelector('.doings')

let todoList = [];

if (localStorage.getItem('doings')) {
    todoList = JSON.parse(localStorage.getItem('doings'));
    displayPoints();
}

document.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {

        let newTodo = {
            todo: addPoint.value,
            checked: false
        }

        if (newTodo.todo != '') {
            todoList.push(newTodo);
        }

        displayPoints();
        localStorage.setItem('doings', JSON.stringify(todoList));
    }
});

function displayPoints() {
    let displayPoint = '';
    todoList.forEach(function (item, i) {
        displayPoint += `
        <li>
        <div class = "circle"></div>
        <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
        <label for='item_${i}'>${item.todo}</label>
        </li>
        `;
        doings.innerHTML = displayPoint;

        document.getElementById('input_point').value = ""; //очистка поля ввода после нажатия Enter
    })
}

doings.addEventListener('change', function (e) {
    let idInput = e.target.getAttribute('id');
    let forLabel = doings.querySelector('[for=' + idInput + ']');
    let valueLabel = forLabel.innerHTML;

    todoList.forEach(function (item) {
        if (item.todo === valueLabel) {
            item.checked = !item.checked;
            localStorage.setItem('doings', JSON.stringify(todoList));
        }
    });
});
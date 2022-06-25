let addPoint = document.querySelector('.newPoint');
let doings = document.querySelector('.doings');

let todoList = [];

// let deleteArr = [];

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

        // let removeButton = document.getElementById(`${i}`);
        // console.log(removeButton);
        // deleteArr.push(removeButton);
        // console.log(deleteArr);

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
        <input type='image' id=${i} class='removeButton' src='../img/pngwing.png'>
        </li>
        `;
        doings.innerHTML = displayPoint;

        // let removeButton = document.getElementById(`${i}`);
        // console.log(removeButton);

        // if (deleteArr.length == `${i}`) {
        //     deleteArr.push(removeButton);
        //     console.log(deleteArr);
        // }

        document.getElementById('input_point').value = ""; //очистка поля ввода после нажатия Enter
    })
}

// изменение атрибута checked;
// навешиваем событие 'change' на элементы списка .doings;
doings.addEventListener('change', function (e) {
    // получаем значение атрибута for элемента, на котором произошло событие;
    let idInput = e.target.getAttribute('id');
    // получаем элемент со значением атрибута for, найденным выше; 
    let forLabel = doings.querySelector('[for=' + idInput + ']');
    // получаем содержимое элемента, полученного выше;
    let valueLabel = forLabel.innerHTML;

    // перебираем массив todoList;
    todoList.forEach(function (item) {
        if (item.todo === valueLabel) {
            item.checked = !item.checked;
            localStorage.setItem('doings', JSON.stringify(todoList));
        }
    });
});

// deleteArr.forEach(function (item) {
//     console.log(item);
//     item.addEventListener('click', function (e) {
//         // получаем содержимое label(пункт списка дел);
//         let targetParent = e.target.previousElementSibling.innerHTML;
//         // перебор массива todoList;
//         todoList.forEach(function (item) {
//             // если содержимое св-ва todo данного элемента массива = содержимому
//             // label, то получаем индекс данного элемента и удаляем его;
//             if (item.todo === targetParent) {
//                 // удаляем весь элемент списка со страницы;
//                 e.target.parentElement.remove();

//                 let index = todoList.indexOf(item)
//                 todoList.splice([index], 1);

//                 // перезаписываем localStorage;
//                 localStorage.setItem('doings', JSON.stringify(todoList));
//             }
//         });

//     });
// });

// function deleteElement() {
// получаем коллекцию кнопок удаления элемента списка;
// let removeButton = document.getElementsByClassName('removeButton');
// console.log(removeButton);
// // }

let removeButton = document.getElementsByClassName('removeButton');
console.log(removeButton);

// перебор полученной коллекции кнопок;
for (let itemCollection of removeButton) {
    // прослушка на элементы коллекции кнопок;
    itemCollection.addEventListener('click', function (e) {
        // получаем содержимое label(пункт списка дел);
        let targetParent = e.target.previousElementSibling.innerHTML;
        // перебор массива todoList;
        todoList.forEach(function (item) {
            // если содержимое св-ва todo данного элемента массива = содержимому
            // label, то получаем индекс данного элемента и удаляем его;
            if (item.todo === targetParent) {
                // удаляем весь элемент списка со страницы;
                e.target.parentElement.remove();

                let index = todoList.indexOf(item)
                todoList.splice([index], 1);

                // перезаписываем localStorage;
                localStorage.setItem('doings', JSON.stringify(todoList));
            }
        });

    });
}

// createElement().then(deleteElement());
// createElement().then(displayPoints()).then(deleteElement());
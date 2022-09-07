const todoTask = document.querySelector('.todo'); 
const addBtn = document.querySelector('.addBtn');
const tasks = document.querySelector('.tasks');
const checkbox = document.getElementById('check')
const errorText = document.querySelector('.error');
const hrs = document.querySelector('.hours');
const mins = document.querySelector('.mins');
const day = document.querySelector('.day');
const date = document.querySelector('.date');
const month = document.querySelector('.month');
const view = document.querySelector('.viewLists')
const tasksList = [];

const days = {
    1: 'Sunday',
    2: 'Monday',
    3: 'Tuesday',
    4: 'Wednesday',
    5: 'Thursday',
    6: 'Friday',
    7: 'Saturday'
}

const months = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
}

setTimeout(setInterval(() => {
    hrs.innerHTML = new Date().getHours() >= 10 ? new Date().getHours() : '0' + new Date().getHours();
    mins.innerHTML = new Date().getMinutes() >= 10 ? new Date().getMinutes() : '0' + new Date().getMinutes();
    day.innerHTML = days[new Date().getDay()+1] + ',';
    date.innerHTML = new Date().getDate();
    month.innerHTML = months[new Date().getMonth()+1];}
, 30), 0);

const deleteTask = (id) => {
    if (tasksList.length !== 0) {
        document.getElementById(id).remove();
    }
    else {
        tasks.innerHTML = "";
    }
}

const check = (event) => {
    event.target.classList.toggle('striked');
    console.log(event.target);
}

const clearList = () => {
    tasks.innerHTML = "";
}

const addTodo = () => {
    if (todoTask.value === "") {
        errorText.innerHTML = `<div class="errorText">
                                    <p class="task" style="color: red">Please enter a To-Do task!</p>
                               </div>`;
    }
    else {
        errorText.innerHTML = "";
        const btnId = ((new Date().getMilliseconds())*Math.floor(Math.random()*10));
        tasks.innerHTML += `
                            <button class="clear" onclick="clearList()">Clear My List</button>
                            <div id=${btnId} class="todoTask">
                                <p class="task">${todoTask.value}</p>
                                <div class="taskOps">
                                <button class="delBtn" onclick="deleteTask(${btnId})"><img class="delImg" src="media/bin.png">
                                </div>
                            </div>`;
        todoTask.value = "";
        tasksList.push(document.getElementById(btnId));
    }
}

const showTodos = () => {
    const lists = localStorage.getItem('tasks');

    console.log(JSON.parse(lists));
}

addBtn.addEventListener('click', addTodo);
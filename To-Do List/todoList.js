function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const taskList = document.getElementById('taskList');
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    taskItem.innerHTML = `
        <input type="checkbox" onclick="toggleTask(this)">
        <span>${taskText}</span>
        <button onclick="deleteTask(this)">Delete</button>
    `;
    taskList.appendChild(taskItem);
    taskInput.value = '';
}

function toggleTask(checkbox) {
    const taskItem = checkbox.parentElement;
    taskItem.classList.toggle('completed');
}

function deleteTask(button) {
    button.parentElement.remove();
}

document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});
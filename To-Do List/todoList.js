/* =========================================================
   To-Do List with localStorage persistence
   ========================================================= */
const STORAGE_KEY = 'nichofedlim.tasks';
const taskInput = document.getElementById('taskInput');
const taskList  = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');

/* ---------- State ---------- */
let tasks = loadTasks();

/* ---------- Persistence ---------- */
function loadTasks() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}
function saveTasks() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch { /* storage may be full/disabled */ }
}

/* ---------- Rendering ---------- */
function renderTasks() {
    taskList.innerHTML = '';

    if (tasks.length === 0) {
        const empty = document.createElement('li');
        empty.className = 'task-item';
        empty.style.justifyContent = 'center';
        empty.style.color = '#64748b';
        empty.style.fontSize = '14px';
        empty.textContent = 'No tasks yet. Add one above!';
        taskList.appendChild(empty);
    } else {
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'task-item' + (task.completed ? ' completed' : '');

            const cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.checked = task.completed;
            cb.addEventListener('change', () => toggleTask(index));

            const span = document.createElement('span');
            span.textContent = task.text;

            const btn = document.createElement('button');
            btn.textContent = 'Delete';
            btn.addEventListener('click', () => deleteTask(index));

            li.append(cb, span, btn);
            taskList.appendChild(li);
        });
    }

    // Update count
    const remaining = tasks.filter(t => !t.completed).length;
    taskCount.textContent = tasks.length
        ? `${remaining} of ${tasks.length} remaining`
        : '';
}

/* ---------- Actions ---------- */
function addTask() {
    const text = taskInput.value.trim();
    if (text === '') return;

    tasks.push({ text, completed: false });
    taskInput.value = '';
    saveTasks();
    renderTasks();
    taskInput.focus();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

/* ---------- Events ---------- */
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

/* ---------- Init ---------- */
renderTasks();

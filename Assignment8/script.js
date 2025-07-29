// To-Do List with Add, Edit, Delete, Mark Complete, and Local Storage

document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.forEach(task => createTaskElement(task.text, task.completed));
}

function saveTasks() {
    const items = Array.from(document.querySelectorAll('#todo-list li')).map(li => ({
        text: li.querySelector('.task-text').textContent,
        completed: li.classList.contains('completed')
    }));
    localStorage.setItem('tasks', JSON.stringify(items));
}

function createTaskElement(task, completed = false) {
    const li = document.createElement('li');
    if (completed) li.classList.add('completed');

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = task;
    li.appendChild(span);

    const actions = document.createElement('div');
    actions.className = 'action-btns';

    // Done button
    const doneBtn = document.createElement('button');
    doneBtn.textContent = 'Done';
    doneBtn.className = 'done-btn';
    doneBtn.onclick = () => {
        li.classList.toggle('completed');
        saveTasks();
    };
    actions.appendChild(doneBtn);

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-btn';
    editBtn.onclick = () => {
        if (li.classList.contains('completed')) return; // Don't edit completed tasks
        const input = document.createElement('input');
        input.type = 'text';
        input.value = span.textContent;
        input.onkeydown = (e) => {
            if (e.key === 'Enter') {
                span.textContent = input.value;
                li.replaceChild(span, input);
                saveTasks();
            }
        };
        input.onblur = () => {
            span.textContent = input.value;
            li.replaceChild(span, input);
            saveTasks();
        };
        li.replaceChild(input, span);
        input.focus();
    };
    actions.appendChild(editBtn);

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = () => {
        li.remove();
        saveTasks();
    };
    actions.appendChild(deleteBtn);

    li.appendChild(actions);
    document.getElementById('todo-list').appendChild(li);
}

function addTask() {
    const input = document.getElementById('todo-input');
    const task = input.value.trim();
    if (!task) return;
    createTaskElement(task);
    saveTasks();
    input.value = '';
}

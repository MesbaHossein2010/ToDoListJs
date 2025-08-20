// create.js
document.addEventListener('DOMContentLoaded', function() {
    const createBtn = document.getElementById('create');
    const sidebar = document.getElementById('tasks-sidebar');
    const main = document.getElementById('tasks');

    createBtn.addEventListener('click', function() {
        // Create form for new task
        const formHtml = `
            <div class="task" id="new-task-form">
                <form id="create-form">
                    <input name="title" type="text" id="new-title" placeholder="Task Title" required>
                    <div class="checkbox-container">
                        <input name="status" id="new-status" type="checkbox">
                        <label for="new-status">Completed</label>
                    </div>
                    <button type="submit">Create Task</button>
                    <button type="button" id="cancel-create">Cancel</button>
                </form>
            </div>
        `;

        // Add form to main content
        main.insertAdjacentHTML('afterbegin', formHtml);

        const form = document.getElementById('create-form');
        const cancelBtn = document.getElementById('cancel-create');

        // Focus on the title input
        document.getElementById('new-title').focus();

        // Handle form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const title = form['title'].value;
            const completed = form['status'].checked;

            if (!title.trim()) {
                alert('Please enter a task title');
                return;
            }

            // Create new task data object
            const newTaskData = {
                title: title,
                completed: completed,
                id: Date.now() // Using timestamp as unique ID
            };

            // Add task to main content
            addTaskToMain(newTaskData);

            // Add task to sidebar
            addTaskToSidebar(newTaskData);

            // Remove the form
            document.getElementById('new-task-form').remove();
        });

        // Handle cancel button
        cancelBtn.addEventListener('click', function() {
            document.getElementById('new-task-form').remove();
        });

        // Scroll to the form
        document.getElementById('new-task-form').scrollIntoView({ behavior: 'smooth' });
    });

    function addTaskToMain(data) {
        main.insertAdjacentHTML(
            'beforeend',
            `<div class="task new-task" id="${data.title.replaceAll(' ', '-')}">
                <h2>${data.title}</h2>
                <h4 class="${data.completed ? 'complete' : 'uncompleted'}">
                    ${data.completed ? 'completed!' : 'uncompleted'}
                </h4>
                <button type="button" class="edit">Edit</button>
                <button type="button" class="delete">Delete</button>
            </div>`
        );

        const taskEl = document.getElementById(data.title.replaceAll(' ', '-'));
        const editBtn = taskEl.querySelector('.edit');
        const deleteBtn = taskEl.querySelector('.delete');

        // Add event listeners for edit and delete
        editBtn.addEventListener('click', () => {
            // Import and use the edit function from edit.js
            if (typeof edit === 'function') {
                edit(taskEl, editBtn, data);
            }
        });

        deleteBtn.addEventListener('click', () => {
            taskEl.remove();
            let sidebarItem = document.getElementById(data.title.replaceAll(' ', '-') + "-sidebar");
            if (sidebarItem) sidebarItem.remove();
        });

        // Scroll to the new task
        setTimeout(() => {
            taskEl.scrollIntoView({ behavior: 'smooth' });
        }, 350);
    }

    function addTaskToSidebar(data) {
        const title = data.title.length > 30 ? data.title.slice(0, 30) + '...' : data.title;
        sidebar.insertAdjacentHTML(
            'beforeend',
            `<div id="${data.title.replaceAll(' ', '-') + "-sidebar"}" class="task-item">
                <a href="#${data.title.replaceAll(' ', '-')}">
                    <h4>${title}</h4>
                </a>
            </div>`
        );

        // Add click event to scroll to the task
        const sidebarItem = document.getElementById(data.title.replaceAll(' ', '-') + "-sidebar");
        sidebarItem.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById(data.title.replaceAll(' ', '-')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});
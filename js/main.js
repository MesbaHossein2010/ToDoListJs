const main = document.getElementById('tasks');

async function addTasks(fetchedData) {
    try {
        let index = 0
        fetchedData.forEach((data) => {

            main.insertAdjacentHTML(
                'beforeend',
                `<div class="task" id="${data.title.replaceAll(' ', '-')}">
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

            editBtn.addEventListener('click', () => {
                edit(taskEl, editBtn, data)
            });

            deleteBtn.addEventListener('click', () => {
                taskEl.remove()
                let sidebarItem = document.getElementById(data.title.replaceAll(' ', '-') + "-sidebar");
                if (sidebarItem) sidebarItem.remove();
            });
        });
        index++
    } catch (error) {
        console.error(error);
        main.insertAdjacentHTML('beforeend', `<h2>Error loading task</h2>`);
    }
}

window.tasks.then(data => addTasks(data));

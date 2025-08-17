const main = document.getElementById('tasks');

async function addTasks(fetchedData) {
    try {
        fetchedData.forEach((data) => {
            main.insertAdjacentHTML(
                'beforeend',
                `<div class="task" id="${data.title.replaceAll(' ', '-')}">
                    <h2>${data.title}</h2>
                    <h4 class="${data.completed === true ? 'complete' : 'uncompleted'}">${data.completed === true ? 'completed!' : 'uncompleted'}</h4>
                    </div>`
            );
        });

    } catch (error) {
        console.error(error);
        main.insertAdjacentHTML(
            'beforeend',
            `<h2>Error loading task</h2>`
        );
    }
}
console.log(window.tasks)
window.tasks.then(data => addTasks(data))
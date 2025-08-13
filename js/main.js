const main = document.getElementById('tasks');

async function addTasks() {
    try {
        const fetchedData = await fetch('https://jsonplaceholder.typicode.com/todos/')
            .then(response => response.json());

        fetchedData.forEach((data) => {
            main.insertAdjacentHTML(
                'beforeend',
                `<div class="task" id="${data.title.replaceAll(' ', '-')}">
                    <h2>${data.title}</h2>
                    <h4 class="${data.completed === true ? 'complete' : 'uncompleted'}">${data.completed === true ? 'completed!' : 'uncompleted'}</h4>
                    </div>`
            );
        });
        updateActiveSection();
    } catch (error) {
        console.error(error);
        main.insertAdjacentHTML(
            'beforeend',
            `<h2>Error loading task</h2>`
        );
    }
}

addTasks();

const sidebar = document.getElementById('tasks-sidebar');

function addTitles(fetchedData) {
    try {
        fetchedData.forEach((data) => {
            title = data.title.length > 30 ? data.title.slice(0, 30) + '...' : data.title
            sidebar.insertAdjacentHTML(
                'beforeend',
                `<div id="${data.title.replaceAll(' ', '-') + "-sidebar"}" class="task-item"><a href="#${data.title.replaceAll(' ', '-')}">
                    <h4>${title}</h4>
                 </a></div>`
            );
        });
    } catch (error) {
        console.error(error);
        sidebar.insertAdjacentHTML(
            'beforeend',
            `<h2>Error loading task</h2>`
        );
    }
}
window.tasks.then(data => addTitles(data));
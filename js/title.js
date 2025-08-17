let index = 0;
let titles = [];

async function loadTitles() {
    const fetchedData = await fetch('https://jsonplaceholder.typicode.com/todos/')
        .then(response => response.json())
        .catch(error => {
            console.error(error);
            return {title: 'Error loading task'};
        });

    titles = [
        'ToDo list',
        'Come and see your tasks',
        "Don't forget your work!",
        'Finish:' + fetchedData[30].title.slice(0, 10) + '...'
    ];
    return fetchedData
}

function changeTitle() {
    document.title = titles[index];
    index = (index + 1) % titles.length;
}

async function title() {
    let data = await loadTitles();
    changeTitle();
    setInterval(changeTitle, 3000);
    return data;
}

window.tasks = title();
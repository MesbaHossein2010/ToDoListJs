
function edit(taskEl, editBtn, data){
    const title = taskEl.querySelector("h2")
    const status = taskEl.querySelector("h4")
    title.remove()
    status.remove()
    editBtn.remove()
    taskEl.insertAdjacentHTML(
        'afterbegin',
        `<form id="edit">
                            <input name="title" type="text" id="title" placeholder="New Title">
                            <input name="status" id="status" type="checkbox" ${data.completed ? 'checked' : ''}>
                            <label id="status">Status</label>
                            <button type="submit">edit</button>
                        </form>`
    )
    taskEl.querySelector('#edit').addEventListener('submit', function (e) {
        e.preventDefault();
        const form = e.target
        taskEl.querySelector('#edit').remove()
        taskEl.insertAdjacentHTML(
            'afterbegin',
            `<h2>${form["title"].value}</h2>
                               <h4 class="${form['status'].value === 'on' ? 'complete' : 'uncompleted'}">
                                   ${form['status'].value === 'on' ? 'completed!' : 'uncompleted'}
                               </h4>`)
        taskEl.appendChild(editBtn)
    });
}
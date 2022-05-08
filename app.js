// Array for the run ID's
let runArray = [];

// Run Class
class Run {
    constructor(id, title, distance, time) {
        this.id = id;
        this.title = title;
        this.distance = distance;
        this.time = time;
    }
}

// UI Controller
class UI {
    addRun(run) {
        const body = document.getElementById('table-body');
        const row = document.createElement('tr');
        row.className = run.id;
        row.innerHTML += `
            <td id="${run.id}">${run.id}</td>
            <td>${run.title}</td>
            <td>${run.distance}</td>
            <td>${run.time}</td>
            <td>${(run.distance / run.time).toFixed(2)}</td>
            <td class="edit"><a href="#"><i class="fas fa-edit"></i></a></td>
            <td class="delete"><a href="#"><i class="fas fa-trash"></i></a></td>
        `;
        body.appendChild(row);
    }
    feedbackMsg(message, className) {
        const container = document.querySelector('.container');
        const form = document.querySelector('.run-form');
        const div = document.createElement('div');
        div.className = className;
        div.innerText = message;
        container.insertBefore(div, form);

        setTimeout(() => {
            div.remove();
        }, 3000);
    }
    deleteRun(e) {
        e.target.parentElement.parentElement.parentElement.remove();
    }
    editRun(run) {
        const ui = new UI();
        const editForm = document.createElement('form');
        editForm.classList = 'edit-run-form card form';
        console.log(editForm);
        editForm.innerHTML = `
            <div class="form-field">
            <li>Run Title</li>
            <input id="titleInputEdit" value="${run.title}" type="text" maxlength="40">
            </div>
            <div class="form-field">
                <li>Run Distance (km)</li>
                <input id="distanceInputEdit" value="${run.distance}" type="text">
            </div>
            <div class="form-field">
                <li>Run Time (minutes)</li>
                <input id="minutesInputEdit" value="${run.time}" type="text">
            </div> 
            <input type="submit" class="btn btn-success">
        `;


        document.querySelector('.run-form').style.display = 'none';
        document.querySelector('.container').appendChild(editForm);
        editForm.addEventListener('submit', e => {
            const title = document.getElementById('titleInputEdit').value;
            const distance = document.getElementById('distanceInputEdit').value;
            const time = document.getElementById('minutesInputEdit').value;
            const id = run.id;
            const newRun = new Run(id, title, distance, time);
            if (title === '' || distance === '' || time === '') {
                ui.feedbackMsg('Please fill in all values', 'error');
            } else {
                ui.addRun(newRun);
                ui.feedbackMsg('Run updated!', 'success');
                document.querySelector('.run-form').style.display = 'block';
                editForm.remove();
            }

            e.preventDefault();
        });
    }
}

function runEventListeners() {
    // Event Listener for Submit
    document.querySelector('.run-form').addEventListener('submit', e => {
        const title = document.getElementById('titleInput').value;
        const distance = document.getElementById('distanceInput').value;
        const time = document.getElementById('minutesInput').value;
        const id = runArray.length + 1;
        const run = new Run(id, title, distance, time);

        const ui = new UI();

        // Validate
        if (title === '' || distance === '' || time === '') {
            ui.feedbackMsg('Please fill in all values', 'error');
        } else {
            // Add to id array
            runArray.push(id);

            // Make run appear in the table
            ui.addRun(run);

            // Add success feedback message
            ui.feedbackMsg('Run added!', 'success');

            // Make form fields disappear
            document.getElementById('titleInput').value = '';
            document.getElementById('distanceInput').value = '';
            document.getElementById('minutesInput').value = '';
        }

        e.preventDefault();
    });

    // Delete or Edit Run Event Listener
    document.querySelector('.run-data').addEventListener('click', e => {
        const ui = new UI();

        if (e.target.parentElement.parentElement.className === 'delete') {
            ui.deleteRun(e);
            ui.feedbackMsg('Run removed!', 'success');
        } else if (e.target.parentElement.parentElement.className === 'edit') {
            const selectedRun = e.target.parentElement.parentElement.parentElement;
            const runChildren = selectedRun.childNodes;
            let newArray = [];
            runChildren.forEach(run => {
                if (run.innerText !== undefined) {
                    newArray.push(run.innerText);
                }
            })
            const id = newArray[0];
            const title = newArray[1];
            const distance = newArray[2];
            const time = newArray[3];
            const editedRun = new Run(id, title, distance, time);
            ui.editRun(editedRun)
            ui.deleteRun(e);
        }
        e.preventDefault();
    });
}

runEventListeners();

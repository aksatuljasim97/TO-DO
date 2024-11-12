let totalTasks = 0;
let completedTasks = 0;

function updateCounters() {
    document.getElementById('task-progress').textContent = `Tasks: ${completedTasks}/${totalTasks}`;
}

// Function to display the current date and time
function displayDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit' };
    
    const dateStr = now.toLocaleDateString(undefined, options);
    const timeStr = now.toLocaleTimeString(undefined, timeOptions);
    
    document.getElementById('date-time').textContent = `${dateStr}, ${timeStr}`;
}

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const taskList = document.getElementById('task-list');

    // Create a new task element
    const taskItem = document.createElement('li');
    taskItem.classList.add('task');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.onchange = () => {
        taskItem.classList.toggle('completed');
        
        // Update completed and remaining counters
        if (checkbox.checked) {
            completedTasks += 1;
        } else {
            completedTasks -= 1;
        }
        updateCounters();
    };

    const taskContent = document.createElement('span');
    taskContent.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => {
        // Remove task from the list
        if (checkbox.checked) {
            completedTasks -= 1;
        }
        totalTasks -= 1;
        taskList.removeChild(taskItem);
        updateCounters();
    };

    // Append elements to the task item
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskContent);
    taskItem.appendChild(deleteButton);

    // Add the new task to the list
    taskList.appendChild(taskItem);

    // Update total task count and counters
    totalTasks += 1;
    updateCounters();

    // Clear the input field
    taskInput.value = '';
}

// Run displayDateTime every second to update the time
setInterval(displayDateTime, 1000);

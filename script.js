const newTaskInput = document.querySelector('#new-task');
const addTaskButton = document.querySelector('button');
const taskList = document.querySelector('#task-list');

function addTask() {
  // Create a new list item
  const newTask = document.createElement('li');
  const taskName = document.createElement('span');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  
  // Set the text content and attributes of the new list item and buttons
  taskName.textContent = newTaskInput.value;
  editButton.textContent = 'Edit';
  editButton.classList.add('edit-btn');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('delete');
  
  // Append the task name and buttons to the new list item
  newTask.appendChild(taskName);
  newTask.appendChild(editButton);
  newTask.appendChild(deleteButton);
  
  // Append the new list item to the task list
  taskList.appendChild(newTask);
  
  // Clear the input field
  newTaskInput.value = '';
}

function editTask(event) {
  const listItem = event.target.parentNode;
  const taskInput = document.createElement("input");
  const editBtn = listItem.querySelector(".edit-btn");
  const taskText = listItem.querySelector("span");
  const saveBtn = document.createElement("button");
  saveBtn.innerHTML = "Save";
  saveBtn.classList.add("save-btn");
  listItem.replaceChild(taskInput, taskText);
  listItem.replaceChild(saveBtn, editBtn);
  taskInput.focus();
  taskInput.value = taskText.textContent;
  taskInput.classList.add("edit-task");
  saveBtn.addEventListener("click", function() {
    taskText.textContent = taskInput.value;
    listItem.replaceChild(taskText, taskInput);
    listItem.replaceChild(editBtn, saveBtn);
  });
}

function deleteTask(event) {
  const task = event.target.parentNode;
  taskList.removeChild(task);
}

// Add click event listeners to the Edit and Delete buttons using event delegation
taskList.addEventListener('click', function(event) {
  if (event.target.classList.contains('edit-btn')) {
    editTask(event);
  }
  else if (event.target.classList.contains('delete')) {
    deleteTask(event);
  }
});
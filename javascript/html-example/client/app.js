import { Task } from "./sdk/task.sdk.js";

// get the token from local storage
let token = localStorage.getItem("apiToken");
if (!token) {
  // generate a random token
  token =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  localStorage.setItem("apiToken", token);
}

// iterate over all tasks
const tasks = (await Task.getAllTasksByUser(token)).tasks;
for (const task of tasks) {
  // add it to the DOM as pure HTML to a div with id="tasks"
  document.getElementById("tasks").innerHTML += `
  <div class="mb-3">
    <div class="d-flex align-items-center">
      <input type="checkbox" id=""/>

      <p class="mb-0" style="margin-right: auto; margin-left: 20px">
        <span>${task.title}</span>
        <a href="${task.url}" target="_blank">link</a>
      </p>
      <div style="cursor: pointer" class="task-delete-btn" id="${task._id}">
        <img width="20px" src="public/trash.svg" />
      </div>
    </div>
  </div>
  `;
}

// delete a task by id
async function handleDelete(id) {
  // delete the task with the id and the token from local storage using the SDK
  const res = await Task.deleteTask(localStorage.getItem("apiToken"), id);
  if (res.success) {
    // reload the page
    location.reload();
  }
}

// add a new task
async function handleAdd() {
  document.getElementById("modal-error-elem").innerHTML = "";

  // take taskTitle from the input field with id="task-title-input"
  const taskTitle = document.getElementById("task-title-input").value;

  if (!taskTitle) {
    // show an error message
    document.getElementById("modal-error-elem").innerHTML =
      "Title is mandatory";
    return;
  }

  // create a new task with the title and the token from local storage using the SDK
  const res = await Task.createTask(
    localStorage.getItem("apiToken"),
    taskTitle
  );
  if (res.success) {
    // reload the page
    location.reload();
  }
}

// add an event listener to all elements with class "task-delete-btn"
const deleteBtns = document.getElementsByClassName("task-delete-btn");
for (const btn of deleteBtns) {
  btn.addEventListener("click", async () => {
    // get the task id from the parent element
    const taskId = btn.id;
    await handleDelete(taskId);
  });
}

// add an event listener to the button with id="add-task-btn"
document.getElementById("add-task-btn").addEventListener("click", async (e) => {
  e.preventDefault();
  await handleAdd();
});

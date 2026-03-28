const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const task = {
    id: Date.now(),
    text: input.value,
    done: false
  };

  tasks.push(task);
  saveTasks();
  renderTasks();

  form.reset();
});

function renderTasks(filter = "all") {
  list.innerHTML = "";

  let filtered = tasks;

  if (filter === "done") {
    filtered = tasks.filter(t => t.done);
  } else if (filter === "pending") {
    filtered = tasks.filter(t => !t.done);
  }

  filtered.forEach(task => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span onclick="toggleTask(${task.id})" class="${task.done ? 'done' : ''}">
        ${task.text}
      </span>
      <button onclick="deleteTask(${task.id})">❌</button>
    `;

    list.appendChild(li);
  });
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, done: !task.done } : task
  );

  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);

  saveTasks();
  renderTasks();
}

function filterTasks(type) {
  renderTasks(type);
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

renderTasks();
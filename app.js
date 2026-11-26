const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");
const counter = document.getElementById("counter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");

    const text = document.createElement("span");
    text.textContent = task.text;
    text.addEventListener("click", () => {
      tasks[index].done = !tasks[index].done;
      save();
      render();
    });

    const del = document.createElement("button");
    del.textContent = "Delete";
    del.addEventListener("click", () => {
      tasks.splice(index, 1);
      save();
      render();
    });

    li.append(text, del);
    list.appendChild(li);
  });

  const remaining = tasks.filter(t => !t.done).length;
  counter.textContent = `${remaining} task(s) remaining`;
}

function addTask() {
  const value = input.value.trim();
  if (!value) return;
  tasks.push({ text: value, done: false });
  input.value = "";
  save();
  render();
}

addBtn.addEventListener("click", addTask);
input.addEventListener("keydown", e => {
  if (e.key === "Enter") addTask();
});

render();
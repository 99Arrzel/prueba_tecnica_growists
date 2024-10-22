/**
 * Im going to supose tasks are just notes and this is like a todo list
 */
const file = require("fs");
//We check if file exists
const exists = file.existsSync("./tasks.json");
let taskList;
if (exists) {
  taskList = file.readFileSync("./tasks.json");
}
if (!taskList) {
  taskList = [];
}

function addTask(task) {
  if (!taskList) {
    taskList = [];
  }
  taskList.push(task);
  file.writeFileSync("./tasks.json", JSON.stringify(taskList));
}
function deleteTask(idx) {
  taskList.splice(idx, 1);
  file.writeFileSync("./tasks.json", JSON.stringify(taskList));
}

function completeTask(idx) {
  taskList[idx].completed = true;
  file.writeFileSync("./tasks.json", JSON.stringify(taskList));
}
function listPendingTasks() {
  return taskList.filter((task) => !task.completed);
}
function saveTasks() {
  file.writeFileSync("./tasks.json", JSON.stringify(taskList));
}
//Read input
let isRunning = true;
do {
  console.log("Pending tasks: ", listPendingTasks().length);
  console.log("1. Add task");
  console.log("2. Delete task");
  console.log("3. Complete task");
  console.log("4. List pending tasks");
  console.log("5. Save tasks");
  console.log("6. Exit");
  let input = parseInt(prompt("Enter your choice: "));
  if (input === 1) {
    let task = prompt("Enter task: ");
    addTask({ task, completed: false });
  }
  if (input === 2) {
    listPendingTasks();
    let idx = parseInt(prompt("Enter index: "));
    deleteTask(idx);
  }
  if (input === 3) {
    let idx = parseInt(prompt("Enter index: "));
    completeTask(idx);
  }
  if (input === 4) {
    console.log(listPendingTasks());
  }
  if (input === 5) {
  }
  if (input === 6) {
    isRunning = false;
  }
  saveTasks();
} while (isRunning);

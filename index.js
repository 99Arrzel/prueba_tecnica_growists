/**
 * Im going to supose tasks are just notes and this is like a todo list
 * Just simple fs
 */
const file = require("fs");
//We check if file exists

let taskList;
export function LoadTasks() {
  const exists = file.existsSync("./tasks.json");
  if (exists) {
    taskList = JSON.parse(file.readFileSync("./tasks.json"));
  }
  if (!taskList) {
    console.log("No tasks found");
    taskList = [];
  }
  return taskList;
}
export function fromMemToJson() {
  file.writeFileSync("./tasks.json", JSON.stringify(taskList));
  return taskList;
}
export function addTask(task) {
  if (!taskList) {
    taskList = [];
  }
  return taskList.push(task);
  // file.writeFileSync("./tasks.json", JSON.stringify(taskList));
}
export function validIdx(idx) {
  if (idx >= taskList.length || idx < 0) {
    return false;
  }
  return true;
}
export function deleteTask(idx) {
  if(!validIdx(idx)) return "Invalid index";
  return taskList.splice(idx, 1);
  // file.writeFileSync("./tasks.json", JSON.stringify(taskList));
}

export function completeTask(idx) {
  if(!validIdx(idx)) return "Invalid index";
  taskList[idx].completed = true;
  return taskList[idx];
  // file.writeFileSync("./tasks.json", JSON.stringify(taskList));
}
export function getTask(idx) {
  if(!validIdx(idx)) return "Invalid index";
  return taskList[idx];
}
export function listPendingTasks() {
  return taskList.filter((task) => !task.completed);
}
export function saveTasks(tList) {
  if(!tList) return;
  file.writeFileSync("./tasks.json", JSON.stringify(tList));
  return taskList;
}
export function main() {
  let isRunning = true;
  let sessionIsSaved = true;
  do {
    if (!sessionIsSaved) {
      //IDK why the requirement is not auto save but ok
      console.log("Session is not saved, please save tasks");
    }
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
      sessionIsSaved = false;
    }
    if (input === 2) {
      console.table(listPendingTasks());
      let idx = parseInt(prompt("Enter index: "));
      deleteTask(idx);
      sessionIsSaved = false;
    }
    if (input === 3) {
      let idx = parseInt(prompt("Enter index: "));
      //Safe check, just to be sure...
      if (idx > taskList.length || idx < 0) {
        console.log("Invalid index");
      } else {
        completeTask(idx);
        sessionIsSaved = false;
      }
    }
    if (input === 4) {
      console.table(listPendingTasks());
    }
    if (input === 5) {
      saveTasks(taskList);
      sessionIsSaved = true;
    }
    if (input === 6) {
      if (!sessionIsSaved) {
        let save = prompt("Do you want to save tasks? (y/n)");
        if (save?.toLowerCase().startsWith("y")) {
          saveTasks(taskList);
        }
      }
      isRunning = false;
    }
  } while (isRunning);
}

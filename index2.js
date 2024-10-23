//This is the REST API
//Im using bun btw https://bun.sh/docs/api/http
//Because its easier to use, I added types with bun i, but its not necesary to install them for use it.
import {
  addTask,
  completeTask,
  listPendingTasks,
  deleteTask,
  getTask,
  saveTasks,
  LoadTasks,
  fromMemToJson,
} from "./index"; //Reused functions
console.log("Starting server...");
Bun.serve({

  async fetch(req) {
    //Since http is stateless, we can reload the tasks in every request
    LoadTasks();
    //Then handle cases...
    if (req.url.endsWith("/tareas") && req.method === "GET") {
      return new Response(JSON.stringify(listPendingTasks()));
    }
    if (req.url.endsWith("/tareas") && req.method === "POST") {
      //parse body
      try {
        const body = await req.json();
        const { task } = body;
        addTask({ task, completed: false });
        fromMemToJson();
        return new Response("Added task");
      } catch (err) {
        return new Response(
          "Invalid body, must be JSON and with a task property"
        );
      }
    }
    const idx = req.url.split("/").pop();
    const aNumber = idx && isNaN(Number(idx));
    if (!aNumber && req.url.includes("/tareas")) {
      //ok i googled this one
      if (!idx) return new Response("Must give an index");
      if (req.method === "DELETE") {
        const res = deleteTask(idx);
        fromMemToJson();
        return new Response(res);
      }
      if (req.method === "PUT") {
        const res = completeTask(idx);
        fromMemToJson();
        return new Response(JSON.stringify(res));
      }
      if (req.method === "GET") {
        return new Response(JSON.stringify(getTask(idx)));
      }
    }
    return new Response("API for tasks.");
  },
});
//This feels weird, sqlite exists

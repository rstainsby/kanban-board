import sqlite3 from "sqlite3";
import { KanbanTask } from "~/types/kanban/task";

export default defineEventHandler((event) => {
  const boards = getAllTasksFromDatabase(event.context.$db);
  
  return boards;
});

function getAllTasksFromDatabase(db: sqlite3.Database): Promise<KanbanTask[]> {
  const responsePromise = new Promise<KanbanTask[]>((resolve, reject) => {
    db.all<KanbanTask>('SELECT * FROM tasks', (err, rows) => {
      if (err) {
        reject(err);
      }
  
      const tasks = rows.map((row) => ({
        id: row.id,
        columnId: row.columnId,
        title: row.title,
        description: row.description,
      }));

      resolve(tasks);
    });
  });

  return responsePromise;
}
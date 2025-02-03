import sqlite3 from "sqlite3";
import { Subtask } from "~/types/kanban/subtask";
import { KanbanTask } from "~/types/kanban/task";

export const getAllTasksForBoard = (db: sqlite3.Database, boardId: string) => 
  asyncQueryAllWrapper<KanbanTask>(db, `
    SELECT * 
    FROM tasks 
    LEFT JOIN columns ON tasks.columnId = columns.id
    WHERE columns.boardId = "${boardId}"
  `);

function asyncQueryAllWrapper<T>(db: sqlite3.Database, query: string) {
  return new Promise<T[]>((resolve, reject) => db.all<T>(query, (err, rows) => {
    if (err) {
      reject(err);
    }

    resolve(rows);
  }));
}

export function getTask(db: sqlite3.Database, id: string): Promise<KanbanTask> {
  const responsePromise = new Promise<KanbanTask>((resolve, reject) => {
    db.get<KanbanTask>(`SELECT * FROM tasks WHERE id = "${id}"`, (err, task) => {
      console.log('task from db', task);
      if (err) {
        reject(err);
      }

      resolve(task);
    });
  });

  return responsePromise;
}

export function getSubtasks(db: sqlite3.Database, taskId: string): Promise<Subtask[]> {
  const responsePromise = new Promise<Subtask[]>((resolve, reject) => {
    db.all<Subtask>(`SELECT * FROM subtasks WHERE taskId = "${taskId}"`, (err, rows) => {
      console.log('rows', rows);
      if (err) {
        reject(err);
      }

      resolve(rows);
    });
  });

  return responsePromise;
}
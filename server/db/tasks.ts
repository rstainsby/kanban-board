import sqlite3 from "sqlite3";
import type { KanbanSubtask } from "~/types/kanban/subtask";
import type { KanbanTask } from "~/types/kanban/task";

export const getAllTasksForBoard = (db: sqlite3.Database, boardId: string) => 
  asyncQueryAllWrapper<KanbanTask>(db, `
    SELECT tasks.* 
    FROM tasks 
    INNER JOIN columns ON tasks.columnId = columns.id
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
      if (err) {
        reject(err);
      }

      resolve(task);
    });
  });

  return responsePromise;
}

export function getSubtasksForBoard(db: sqlite3.Database, boardId: string): Promise<KanbanSubtask[]> {
  const responsePromise = new Promise<KanbanSubtask[]>((resolve, reject) => {
    db.all<KanbanSubtask>(`
      SELECT subtasks.*
      FROM subtasks 
      INNER JOIN tasks ON tasks.id = subtasks.taskId
      INNER JOIN columns ON columns.id = tasks.columnId
      INNER JOIN boards ON boards.id = columns.boardId
      WHERE boardId = "${boardId}"`, (err, rows) => {
      if (err) {
        reject(err);
      }

      resolve(rows);
    });
  });

  return responsePromise;
}

export function getSubtasksForTask(db: sqlite3.Database, taskId: string): Promise<KanbanSubtask[]> {
  const responsePromise = new Promise<KanbanSubtask[]>((resolve, reject) => {
    db.all<KanbanSubtask>(`SELECT * FROM subtasks WHERE taskId = "${taskId}"`, (err, rows) => {
      if (err) {
        reject(err);
      }

      resolve(rows);
    });
  });

  return responsePromise;
}
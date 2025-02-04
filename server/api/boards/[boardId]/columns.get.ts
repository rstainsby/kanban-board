import sqlite3 from "sqlite3";
import type { KanbanColumn } from "~/types/kanban/column";
import { useUuidValidator } from '~/server/utils/uuid-validator';

export default defineEventHandler(async (event) => {
  const boardId = getRouterParam(event, 'boardId');  
  const invalidBoardIdError = useUuidValidator(boardId, 'Board ID');  

  if (invalidBoardIdError) {
    throw invalidBoardIdError;
  }

  const columns = getAllKanbanColumnsForBoard(event.context.$db, boardId!);

  return columns;
});

function getAllKanbanColumnsForBoard(db: sqlite3.Database, boardId: string): Promise<KanbanColumn[]> {
  return new Promise((resolve, reject) => db.all<KanbanColumn>(`SELECT * FROM columns WHERE boardId = "${boardId}"`, (err, rows) => {
    if (err) {
      reject(err);
    }

    resolve(rows);
  }));
}
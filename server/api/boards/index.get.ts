import sqlite3 from "sqlite3";

export default defineEventHandler((event) => {
  const boards = getAllBoardsFromDatabase(event.context.$db);

  return boards;
});

interface Board {
  id: string;
  name: string;
}

function getAllBoardsFromDatabase(db: sqlite3.Database) {
  return new Promise<Board[]>((resolve, reject) => {
    db.all<Board>('SELECT * FROM Boards', function (err, rows) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}
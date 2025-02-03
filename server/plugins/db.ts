import sqlite3 from "sqlite3";

const DB_PATH = './server/db/kanban.db';

export default defineNitroPlugin((nitroApp) => {
   const db = new sqlite3.Database(DB_PATH);

   nitroApp.hooks.hook('request', (event) => {
      event.context.$db = db;
   })

   nitroApp.hooks.hook('close', () => {
      db.close();
   });
});
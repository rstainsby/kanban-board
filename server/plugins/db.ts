import sqlite3 from "sqlite3";

export default defineNitroPlugin(async (nitroApp) => {
   const db = new sqlite3.Database(':memory:');

   const initialiseScript = await useStorage('assets:server').getItem('initialise.sql');

   db.exec(initialiseScript as string);

   nitroApp.hooks.hook('request', (event) => {
      event.context.$db = db;
   })

   nitroApp.hooks.hook('close', () => {
      db.close();
   });
});
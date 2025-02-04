export default defineEventHandler(async (event) => {
  const statuses = event.context.$db.all('SELECT * FROM SubtaskStatus ORDER BY id ASC');

  return statuses;
});
import { useUuidValidator } from "~/server/utils/uuid-validator";

export default defineEventHandler(async (event) => {
  const taskId = getRouterParam(event, 'id');
  const body = await readBody(event);

  const taskIdError = useUuidValidator(taskId, "Task ID");

  if (taskIdError) throw taskIdError;

  const query = [];
  const params: any = {
    $taskId: taskId,
  };

  if (body.columnId) {
    const columnIdError = useUuidValidator(body.columnId, "Column ID");

    if (columnIdError) throw columnIdError;

    query.push('columnId = $columnId');
    params.$columnId = body.columnId;
  }

  if (body.title) {
    query.push('title = $title');
    params.$title = body.title;
  }

  if (body.description) {
    query.push('description = $description');
    params.$description = body.description;
  }

  const queryString = query.join(', ');

  event.context.$db.run(`UPDATE tasks SET ${queryString} WHERE id = $taskId`, params);
});
import { z } from 'zod';

const requestBodySchema = z.object({
  name: z.string(),
  color: z.string(),
});

export default defineEventHandler(async (event) => {
  const boardIdRaw = getRouterParam(event, 'boardId');  
  const boardId = z.string().uuid().safeParse(boardIdRaw);

  if (boardId.error) {
    throw createError({
      status: 400,
      statusMessage: 'Invalid board ID',
      statusText: boardId.error.errors[0].message,
    });
  }

  const column = await readValidatedBody(event, requestBodySchema.safeParse);

  if (column.error) {
    throw createError({
      status: 400,
      statusMessage: 'Invalid request body',
      statusText: column.error.errors[0].message,
    });
  }

  event.context.$db.run('INSERT INTO columns (id, name, boardId, color) VALUES ($id, $name, $boardId, $color)', {
    $id: crypto.randomUUID(),
    $name: column.data.name,
    $boardId: boardId.data,
    $color: column.data.color,
  });

  return column;
});

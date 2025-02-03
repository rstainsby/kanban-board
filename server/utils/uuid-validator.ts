const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

export function useUuidValidator(uuid: string | undefined, idName?: string): Error | undefined {
  const nameForError = idName ?? 'ID';

  if (!uuid) {
    return createError({
      statusCode: 400,
      statusMessage: `${nameForError} is required`
    });
  }

  if (!uuidRegex.test(uuid)) {
    return createError({
      statusCode: 400,
      statusMessage: `${nameForError} is not a valid UUID`
    });
  }
}
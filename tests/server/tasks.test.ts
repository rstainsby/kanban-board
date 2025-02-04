import { describe, expect, it, vi } from "vitest";
import { H3Event } from "h3";
import { useH3TestUtils } from "./utils/h3-test-utils";

describe("[GET] boards/[id]/tasks", async () => {
  let h3 = useH3TestUtils();
  const handler = await import('~/server/api/boards/[boardId]/tasks.get');

  it("should be registered as an event handler", async () => {
    expect(h3.defineEventHandler).toHaveBeenCalled();
  });

  it('should throw an error if the id is not a UUID', async () => {
    const event: Partial<H3Event> = {
      context: {
        params: { boardId: '1' },
        query: {}
      },
    };

    try {
      await handler.default(event as H3Event);
    } catch (error: any) {
      expect(error.statusCode).toBe(400);
      expect(error.statusMessage).toContain('ID is not a valid UUID');
    }
  });

  it('should throw an error if the id is not provided', async () => {
    const event: Partial<H3Event> = {
      context: {
        $db: vi.fn(),
        params: {},
        query: {}
      },
    };

    try {
      await handler.default(event as H3Event);
    } catch (error: any) {
      expect(error.statusCode).toBe(400);
      expect(error.statusMessage).toContain('ID is required');
    }
  });

  it('should also return subtasks if includeSubtasks is true', async () => {
    const event: Partial<H3Event> = {
      context: {
        $db: {
          all: vi.fn((query: string, cb: (err: Error | null, rows: unknown[]) => void) => {
            if (query.includes('FROM subtasks')) {
              cb(null, [{ id: '52144ec3-a5e1-416b-958d-66a407f44cd7', taskId: '52144ec3-a5e1-416b-958d-66a407f44cc9', description: 'Subtask 1 description' }]);
            } else {
              cb(null, [{ id: '52144ec3-a5e1-416b-958d-66a407f44cc9', columnId: '1a0f36bc-5e3d-45fa-aea3-8179a149b59c', title: 'Task 1', description: 'Task 1 description' }]);
            }
          }),
        },
        params: {
          boardId: '52144ec3-a5e1-416b-958d-66a407f44cc9'
        },
        query: {
          includeSubtasks: true
        }
      },
    };

    const results = await handler.default(event as H3Event);

    expect(results).toEqual([{ 
      id: '52144ec3-a5e1-416b-958d-66a407f44cc9', 
      columnId: '1a0f36bc-5e3d-45fa-aea3-8179a149b59c', 
      title: 'Task 1', 
      description: 'Task 1 description',
      subtasks: [
        { 
          id: '52144ec3-a5e1-416b-958d-66a407f44cd7', 
          taskId: '52144ec3-a5e1-416b-958d-66a407f44cc9', 
          description: 'Subtask 1 description' 
        }
      ]
    }]);
  });
});

describe("[GET] tasks/[id]", async () => {
  let h3 = useH3TestUtils();
  const handler = await import('~/server/api/tasks/[id]');

  it("should be registered as an event handler", async () => {
    expect(h3.defineEventHandler).toHaveBeenCalled();
  });

  it('should throw an error if the id is not a UUID', async () => {
    const event: Partial<H3Event> = {
      context: {
        params: { id: '1' },
        query: {}
      },
    };

    try {
      await handler.default(event as H3Event);
    } catch (error: any) {
      expect(error.statusCode).toBe(400);
      expect(error.statusMessage).toContain('ID is not a valid UUID');
    }
  });

  it('should throw an error if the id is not provided', async () => {
    const event: Partial<H3Event> = {
      context: {
        $db: vi.fn(),
        params: {},
        query: {}
      },
    };

    try {
      await handler.default(event as H3Event);
    } catch (error: any) {
      expect(error.statusCode).toBe(400);
      expect(error.statusMessage).toContain('ID is required');
    }
  });

  it('should return a task by id', async () => {
    const event: Partial<H3Event> = {
      context: {
        $db: {
          get: vi.fn((query: string, cb: (err: Error | null, row: unknown) => void) => {
            cb(null, [{ id: '52144ec3-a5e1-416b-958d-66a407f44cc9', columnId: '1a0f36bc-5e3d-45fa-aea3-8179a149b59c', title: 'Task 1', description: 'Task 1 description' }]);
          })
        },
        params: { id: '52144ec3-a5e1-416b-958d-66a407f44cc9' },
        query: {}
      },
    };

    const results = await handler.default(event as H3Event);

    expect(results).toEqual([
      { 
        id: '52144ec3-a5e1-416b-958d-66a407f44cc9', 
        columnId: '1a0f36bc-5e3d-45fa-aea3-8179a149b59c', 
        title: 'Task 1', 
        description: 'Task 1 description' 
      }
    ]);
  });

  it('should also return subtasks if includeSubtasks is true', async () => {
    const event: Partial<H3Event> = {
      context: {
        $db: {
          all: vi.fn((query: string, cb: (err: Error | null, rows: unknown[]) => void) => {
            cb(null, [{ id: '52144ec3-a5e1-416b-958d-66a407f44cd7', taskid: '52144ec3-a5e1-416b-958d-66a407f44cc9', description: 'Subtask 1 description' }]);
          }),
          get: vi.fn((query: string, cb: (err: Error | null, row: unknown) => void) => {
            cb(null, { id: '52144ec3-a5e1-416b-958d-66a407f44cc9', columnId: '1a0f36bc-5e3d-45fa-aea3-8179a149b59c', title: 'Task 1', description: 'Task 1 description' });
          })
        },
        params: {
          id: '52144ec3-a5e1-416b-958d-66a407f44cc9'
        },
        query: {
          includeSubtasks: true
        }
      },
    };

    const results = await handler.default(event as H3Event);

    expect(results).toEqual({ 
      id: '52144ec3-a5e1-416b-958d-66a407f44cc9', 
      columnId: '1a0f36bc-5e3d-45fa-aea3-8179a149b59c', 
      title: 'Task 1', 
      description: 'Task 1 description',
      subtasks: [
        { 
          id: '52144ec3-a5e1-416b-958d-66a407f44cd7', 
          taskid: '52144ec3-a5e1-416b-958d-66a407f44cc9', 
          description: 'Subtask 1 description' 
        }
      ]
    });
  });
});

describe('[GET] tasks', async () => {
  const h3 = useH3TestUtils();
  const handler = await import('~/server/api/tasks/index.get');

  it("should be registered as an event handler", async () => {
    expect(h3.defineEventHandler).toHaveBeenCalled();
  });

  it('should return all tasks', async () => {
    const event: Partial<H3Event> = {
      context: {
        $db: {
          all: vi.fn((query: string, cb: (err: Error | null, rows: unknown[]) => void) => {
            cb(null, [
              { 
                id: '52144ec3-a5e1-416b-958d-66a407f44cc9', 
                columnId: '1a0f36bc-5e3d-45fa-aea3-8179a149b59c', 
                title: 'Task 1', 
                description: 'Task 1 description' 
              }
            ]);
          }),
        }
      },
    };

    const results = await handler.default(event as H3Event);

    expect(results).toEqual([{ id: '52144ec3-a5e1-416b-958d-66a407f44cc9', columnId: '1a0f36bc-5e3d-45fa-aea3-8179a149b59c', title: 'Task 1', description: 'Task 1 description' }]);
  });
});


function createMockTasks() {
  return [
    { id: '52144ec3-a5e1-416b-958d-66a407f44cc9', columnId: '1a0f36bc-5e3d-45fa-aea3-8179a149b59c', title: 'Task 1', description: 'Task 1 description' },
    { id: '52144ec3-a5e1-416b-958d-66a407f44cc8', columnId: '1a0f36bc-5e3d-45fa-aea3-8179a149b59c', title: 'Task 2', description: 'Task 2 description' }
  ];
}
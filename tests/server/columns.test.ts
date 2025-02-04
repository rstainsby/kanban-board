import { describe, expect, it, vi } from "vitest";
import { H3Event } from "h3";
import { useH3TestUtils } from "./utils/h3-test-utils";
import type { KanbanColumn } from "~/types/kanban/column";

describe("[GET] boards/[id]/columns", async () => {
  let h3 = useH3TestUtils();
  const handler = await import('~/server/api/boards/[boardId]/columns.get');

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
      expect(error.statusMessage).toContain('Board ID is not a valid UUID');
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
      expect(error.statusMessage).toContain('Board ID is required');
    }
  });
  
  it('should return all columns that match board ID', async () => {
    const boards = createMockColumns();

    const event: Partial<H3Event> = {
      context: {
        $db: {
          all: vi.fn((query: string, cb: (err: Error | null, rows: unknown[]) => void) => {
            // Mock the behaviour of a WHERE statement
            const queryBoardId = query.indexOf('boardId =');
            const boardId = query.slice(queryBoardId + 11, queryBoardId + 47);

            cb(null, boards.filter(x => x.boardId === boardId));
          }),
        },
        params: {
          boardId: '52144ec3-a5e1-416b-958d-66a407f44cc9'
        }
      },
    };

    const result = await handler.default(event as H3Event);

    expect(result.map(x => x.name)).toEqual(['Column 1', 'Column 2', 'Column 3']);
  });
});

const createMockColumns = (): KanbanColumn[]  => [
  { id: '12144ec3-a5e1-416b-958d-66a407f44cc9', name: 'Column 1', boardId: '52144ec3-a5e1-416b-958d-66a407f44cc9' }, 
  { id: '22144ec3-a5e1-416b-958d-66a407f44cc9', name: 'Column 2', boardId: '52144ec3-a5e1-416b-958d-66a407f44cc9' },
  { id: '6744ec3-a5e1-416b-958d-66a407f44cc9', name: 'Column 3', boardId: '52144ec3-a5e1-416b-958d-66a407f44cc9' },
]
import { describe, expect, it, vi } from "vitest";
import { H3Event } from "h3";
import { useH3TestUtils } from "./utils/h3-test-utils";
import type { KanbanBoard } from "~/types/kanban/board";

describe("[GET] boards", async () => {
  let h3 = useH3TestUtils();
  const handler = await import('~/server/api/boards/index.get');

  it("should be registered as an event handler", async () => {
    expect(h3.defineEventHandler).toHaveBeenCalled();
  });

  it('should return all boards', async () => {
    const boards = createMockBoards();

    const event: Partial<H3Event> = {
      context: {
        $db: {
          all: vi.fn((query: string, cb: (err: Error | null, rows: unknown[]) => void) => {
            cb(null, boards);
          }),
        },
      },
    };

    const result = await handler.default(event as H3Event);

    expect(result).toEqual(boards);
  });
});

const createMockBoards = (): KanbanBoard[]  => [
  { id: '52144ec3-a5e1-416b-958d-66a407f44cc9', name: 'Board 1' },
  { id: '52144ec3-a5e1-416b-958d-66a407f44cc9', name: 'Board 2' },
  { id: '52144ec3-a5e1-416b-958d-66a407f44cc9', name: 'Board 3' },
  { id: '52144ec3-a5e1-416b-958d-66a407f44cc9', name: 'Board 4' },
];
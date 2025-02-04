import { H3Event } from "h3";
import { vi } from "vitest";

type Handler = (event: H3Event) => Promise<unknown>;

export function useH3TestUtils() {
  const h3 = vi.hoisted(() => ({
    defineEventHandler: vi.fn((handler: Handler) => (event: H3Event) => handler(event)),
    // TODO mock these utils: https://www.jsdocs.io/package/h3#package-index-functions 
  }));
 
  // stub `h3` & functions individually to support auto-imports
  vi.stubGlobal("h3", h3);
  vi.stubGlobal("defineEventHandler", h3.defineEventHandler);
  vi.stubGlobal("getRouterParam", vi.fn((event: H3Event, key: string) => event.context.params?.[key]));
  vi.stubGlobal("getQuery", vi.fn((event: H3Event) => event.context.query));
  vi.stubGlobal("readBody", vi.fn(async (event: H3Event) => event.context.body));

  return h3;
};
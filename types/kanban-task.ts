import type { KanbanSubtask } from "./kanban/subtask";

export interface KanbanTask {
  id: string;
  columnId: string;
  title: string;
  subtasks: KanbanSubtask[];
}
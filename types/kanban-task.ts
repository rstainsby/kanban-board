export interface KanbanTask {
  id: string;
  columnId: string;
  title: string;
  totalSubtasks: number;
  completedSubtasks: number;
}
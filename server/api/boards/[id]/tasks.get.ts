import { getAllTasksForBoard, getSubtasks } from "../../../db/tasks";
import { useUuidValidator } from "../../../utils/uuid-validator";

export default defineEventHandler(async (event) => {
  let boardId = getRouterParam(event, 'id');
  const queryParams = getQuery(event);
  const invailBoardIdError = useUuidValidator(boardId);  

  if (invailBoardIdError) {
    throw invailBoardIdError;
  }

  const tasksPromise = getAllTasksForBoard(event.context.$db, boardId!);

  if (queryParams.includeSubtasks == true) {
    const subtasksPromise = getSubtasks(event.context.$db, boardId!);
    
    const [tasks, subtasks] = await Promise.all([tasksPromise, subtasksPromise]);

    const tasksAndSubtasksFormatted = tasks.map(task => ({
      ...task,
      subtasks: subtasks.filter(subtask => subtask.taskId === task.id)
    }));

    return tasksAndSubtasksFormatted;
  }

  return tasksPromise;
});
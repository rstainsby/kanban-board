import { getSubtasksForTask, getTask } from "~/server/db/tasks";
import { useUuidValidator } from "~/server/utils/uuid-validator";

export default defineEventHandler(async (event) => {
  const taskId = getRouterParam(event, 'id');
  const invaidTaskIdError = useUuidValidator(taskId);  

  if (invaidTaskIdError) {
    throw invaidTaskIdError;
  }

  const queryParams = getQuery(event);

 const tasksPromise = getTask(event.context.$db, taskId!);

  if (queryParams.includeSubtasks == true) {
    const subtasksPromise = getSubtasksForTask(event.context.$db, taskId!);
    
    const [task, subtasks] = await Promise.all([tasksPromise, subtasksPromise]);

    const tasksAndSubtasksFormatted = {
      ...task,
      subtasks: subtasks
    }

    return tasksAndSubtasksFormatted;
  }

  return tasksPromise;
});
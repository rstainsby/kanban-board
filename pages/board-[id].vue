<template>
  <div :class="$style['board-container']">
    <div v-if="(!columns || columns.length === 0)" :class="$style['empty-board']">
      <p>This board is empty. Create a new column to get started.</p>
      <Button  label="Add New Column" size="large" rounded @click="onNewColumnCreation">
        <template #icon>
          +
        </template>
      </Button>
    </div>
    <KanbanBoard 
      v-else
      :columns="columns" 
      :tasks="tasks"
      @task-moved="onTaskMoved"
      @new-column-creation="onNewColumnCreation"/>

  </div>
</template>

<script setup lang="ts">
import type { KanbanTask } from '~/types/kanban/task';
import type { KanbanSubtask } from '~/types/kanban/subtask';

const route = useRoute();

const { data: columnsRaw, refresh: refreshColumns } = await useFetch(() => `/api/boards/${route.params.id}/columns`, {
  key: `columns-${route.params.id}`,
});

const { data: tasksRaw, refresh: refreshTasks } = useFetch<(KanbanTask & { subtasks: KanbanSubtask[] })[]>(() => `/api/boards/${route.params.id}/tasks`, {
  key: `tasks-${route.params.id}`,
  params: {
    includeSubtasks: true
  }
});

const columns = computed(() => columnsRaw.value?.map((column) => ({
  id: column.id,
  title: column.name,
  color: column.color
})));

const tasks = computed(() => {
  if (!tasksRaw.value) {
    return [];
  }

  return tasksRaw.value.map((task) => ({
    id: task.id,
    title: task.title,
    columnId: task.columnId,
    subtasks: task.subtasks
  }));
});

const onNewColumnCreation = () => {
  $fetch(`/api/boards/${route.params.id}/columns`, {
    method: 'POST',
    body: JSON.stringify({
      name: 'New Column',
      color: '#72A'
    })
  }).then(() => {
    refreshColumns();
  });
};

const onTaskMoved = (taskId: string, columnId: string) => {
  $fetch(`/api/tasks/${taskId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      columnId
    })
  }).then(() => {
    refreshTasks();
  });
};
</script>

<style module>
.board-container {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.empty-board {
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  align-items: center;
}

.empty-board p {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--p-text-color);
  opacity: 0.7;
}
</style>
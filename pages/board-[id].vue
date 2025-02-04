<template>
  <div :class="$style['board-container']">
    <div v-if="(!columns || columns.length === 0)">
      <p>This board is empty. Create a new column to get started.</p>
      <Button label="Add New Column" icon="pi pi-check"></Button>
    </div>
    <KanbanBoard 
      v-else
      :columns="columns" 
      :tasks="tasks"/>

  </div>
</template>

<script setup lang="ts">
import type { KanbanTask } from '~/types/kanban/task';
import type { KanbanSubtask } from '~/types/kanban/subtask';

const route = useRoute();

const { data: columnsRaw } = await useFetch(() => `/api/boards/${route.params.id}/columns`, {
  key: `columns-${route.params.id}`,
});

const { data: tasksRaw } = useFetch<(KanbanTask & { subtasks: KanbanSubtask[] })[]>(() => `/api/boards/${route.params.id}/tasks`, {
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
</script>

<style module>
.board-container {
  position: absolute;
  top: 0;
  bottom: 0;
}
</style>
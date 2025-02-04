<template>
  <div :class="$style['board-container']">
    <KanbanBoard 
      v-if="columns && columns.length" 
      :columns="columns" 
      :tasks="tasks"/>
    <div v-else>
      <p>This board is empty. Create a new column to get started.</p>
      <Button label="Add New Column" icon="pi pi-check"></Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { KanbanTask } from '~/types/kanban/task';
import type { KanbanSubtask } from '~/types/kanban/subtask';

const route = useRoute();

const { data: columnsRaw, error } = useFetch(`/api/boards/${route.params.id}/columns`);
const { data: tasksRaw, error: tasksError } = useFetch<(KanbanTask & { subtasks: KanbanSubtask[] })[]>(`/api/boards/${route.params.id}/tasks?includeSubtasks=true`);

const columns = computed(() => columnsRaw.value?.map((column) => ({
  id: column.id,
  title: column.name,
  color: column.color
})));

const tasks = computed(() => tasksRaw.value?.map((task) => ({
  id: task.id,
  title: task.title,
  columnId: task.columnId,
  totalSubtasks: task.subtasks?.length ?? 0,
  completedSubtasks: task.subtasks?.filter((subtask: any) => subtask.completed).length ?? 0
})) ?? []);
</script>

<style module>
.board-container {
  position: absolute;
  top: 0;
  bottom: 0;
}
</style>
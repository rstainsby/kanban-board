<template>
  <div :class="$style.columns">
    <KanbanBoardColumn
      v-for="column in columns"
      :key="column.id"
      :id="column.id"
      :title="column.title"
      :color="column.color"
      :tasks="tasksPerColumn.get(column.id)"
      dropzone="true"
      @drop="onDropExistingColumn(column.id, $event)"
      @dragenter.prevent
      @dragover.prevent
      >
      <template #card="task">
        <KanbanBoardCard
            :id="task.id"
            :title="task.title"
            :subtasks="task.subtasks"
            draggable="true" 
            @dragstart="startDrag(task.id, column.id, $event)"
            @dragend="$event.target.classList.remove('dragging')"
          />         
      </template>
    </KanbanBoardColumn>
    <Button 
      id="new-column-button"
      label="Add New Column" 
      severity="secondary" 
      size="large" 
      :class="$style['new-column']"
      dropzone="true"
      @click="$emit('newColumnCreation')"
      @drop="onDropNewColumn($event)"
      @dragenter.prevent
      @dragover.prevent>
    </Button>
  </div>
</template>

<script setup lang="ts">
import type { KanbanTask } from '~/types/kanban-task'
import type { KanbanSubtask } from '~/types/kanban/subtask';

export interface KanbanBoardProps {
  columns: {
    id: string
    title: string
    color: string
  }[],
  tasks: (KanbanTask & { subtasks: KanbanSubtask[]})[];
}

const props = defineProps<KanbanBoardProps>();

const emit = defineEmits<{
  (e: 'newColumnCreation', taskId?: string): void
  (e: 'taskMoved', taskId: string, columnId: string): void
}>();

let tasks = ref(props.tasks);

watch(() => props.tasks, (newTasks) => {
  tasks.value = newTasks;
}, { immediate: false });

const tasksPerColumn = computed(() => {
  const tasksPerColumn = new Map<string, KanbanTask[]>();

  tasks.value.forEach(task => {
    if (!tasksPerColumn.has(task.columnId)) {
      tasksPerColumn.set(task.columnId, []);
    }

    tasksPerColumn.get(task.columnId)?.push(task);
  });

  return tasksPerColumn;
});

function startDrag(cardId: string, columnId: string, event: DragEvent) {
  if (!event.dataTransfer) return;

  const element = event.target as HTMLElement;

  element?.classList.add('dragging');

  event.dataTransfer.dropEffect = 'move';
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('itemId', cardId);
  event.dataTransfer.setData('columnId', columnId);
}

function onDropExistingColumn(columnId: string, event: DragEvent) {
  event.preventDefault();

  if (!event.dataTransfer) return;

  const cardId = event.dataTransfer.getData('itemId');
  
  if (!cardId) return;

  moveCardToColumn(columnId, cardId);

  const element = event.target as HTMLElement;

  element?.classList.remove('dragging');

  emit('taskMoved', cardId, columnId);
}

function onDropNewColumn(event: DragEvent) {
  event.preventDefault();

  if (!event.dataTransfer) return;

  const cardId = event.dataTransfer.getData('itemId');
  
  if (!cardId) return;

  emit('newColumnCreation', cardId);
}

function moveCardToColumn(columnId: string, cardId: string) {
  const card = tasks.value.find(task => task.id === cardId);

  if (!card) return;

  card.columnId = columnId;
}
</script>

<style>
  [draggable] {
    cursor: grab;
  }

  .dragging {
    cursor: grabbing !important;
  }
</style>

<style module>
  .columns {
    display: flex;
    flex-wrap: nowrap;
    justify-content: start;
    align-items: start;
    gap: 1rem;
    height: 100%;
    padding-right: 1rem;
    overflow: auto;
  }

  .new-column {
    display: grid;
    place-items: center;
    gap: 1rem;
    height: 100%;
    width: 17.5rem;
    min-width: 17.5rem;
    border-radius: var(--p-border-radius-md);
    margin-top: 3rem; /* The height of the column header + margin */
    border: 2px dashed var(--p-new-column-border-color); 
  }

  .new-column:hover {
    background-color: var(--p-new-column-hover-background);
  }
</style>

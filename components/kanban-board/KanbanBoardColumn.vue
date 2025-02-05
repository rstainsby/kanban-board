<template>
  <div :class="$style.column">
    <div :class="$style.header">
      <span :class="$style['color-indicator']" :style="{background: color}"/>
      <h2 :class="$style.title">{{ title }} ({{ totalTasks }})</h2>
      <Button severity="primary" size="large" text @click="$emit('createTaskForColumn', id)">
        <template #icon>
            +
        </template>
      </Button>
    </div>
    
    <div :class="$style.cards">
      <slot 
        name="card" 
        v-for="task in tasks" 
        :key="task.id"
        v-bind="task">
          <KanbanBoardCard
            :id="task.id"
            :title="task.title"
            :subtasks="task.subtasks"
          />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { KanbanTask } from '~/types/kanban-task';
import KanbanBoardCard from './KanbanBoardCard.vue';
import type { KanbanSubtask } from '~/types/kanban/subtask';

export interface KanbanColumnProps {
  id: string
  title: string
  color: string
  tasks: (KanbanTask & { subtasks: KanbanSubtask[]})[] | undefined
}

const props = defineProps<KanbanColumnProps>();
const totalTasks = computed(() => props.tasks?.length ?? 0);

defineEmits<{
  (e: 'createTaskForColumn', columnId: string): void
}>();
</script>

<style module>
  .column {
    flex-shrink: 0;
    min-height: 20vh;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
    height: 2rem;
  }

  .header > button {
    margin-left: auto;
  }

  .title {
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
  }

  .color-indicator {
    display: inline-block;
    width: 0.9375rem;
    height: 0.9375rem;
    border-radius: 50%;
  }

  .cards {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    width: 17.5rem;
  }
</style>
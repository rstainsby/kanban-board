<template>

  <Card :class="$style.card" :pt="{
    title: $style['card-title'],
    content: $style['card-subtitle']
  }">
      <template #title>{{ title }}</template>
      <template #content>
        <p>{{ completedSubtasks }} of {{ totalSubtasks }} subtasks</p>
      </template>
  </Card>
</template>

<script setup lang="ts">
  import type { KanbanSubtask } from '~/types/kanban/subtask';

  export interface KanbanBoardCardProps {
    id: string
    title: string
    subtasks: KanbanSubtask[]
  }

  const props = defineProps<KanbanBoardCardProps>();

  const totalSubtasks = computed(() => props.subtasks?.length ?? 0);
  const completedSubtasks = computed(() => props.subtasks?.filter((subtask) => subtask.status).length ?? 0);
</script>

<style module>
  .card {
    padding: 1.44rem 1rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
    flex-shrink: 0;
  }

  .card-title {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 0.35rem;
  }

  .card-subtitle {
    font-size: 0.9rem;
    color: var(--p-text-secondary);
    opacity: 0.8;
    line-height: 1;
  }

  .card-subtitle p {
    margin: 0;
  }
</style>
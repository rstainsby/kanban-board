import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime'
import type { KanbanColumnProps } from './KanbanBoardColumn.vue';
import type { KanbanTask } from '~/types/kanban-task';
import { KanbanBoardColumn } from '#components';

describe('KanbanBoardColumn', () => {
  it('should render a title and a reactive count of cards', async () => {
    const props: KanbanColumnProps = {
      id: '1',
      title: 'Test Column',
      color: 'blue',
      tasks: createMockTasks()
    }

    const component = await mountSuspended(KanbanBoardColumn, {
      route: '/test',
      props
    });
    
    expect(component.text()).toContain('Test Column');
    expect(component.text()).toContain('(3)');

    // Test that the count updates when a task is removed
    props.tasks.pop();

    await component.setProps(props);

    expect(component.text()).toContain('(2)');
  });

  it('should render a list of cards', async () => {
    const props: KanbanColumnProps = {
      id: '1',
      title: 'Test Column',
      color: 'blue',
      tasks: createMockTasks()
    }

    const component = await mountSuspended(KanbanBoardColumn, {
      route: '/test',
      props
    });

    expect(component.text()).toContain('Test Task');
    expect(component.text()).toContain('Another Task');
    expect(component.text()).toContain('Final Task');
  });

  it('should emit an new task event when the "+" button is clicked', async () => {
    const props: KanbanColumnProps = {
      id: '1',
      title: 'Test Column',
      color: 'blue',
      tasks: []
    }

    const component = await mountSuspended(KanbanBoardColumn, {
      route: '/test',
      props
    });

    await component.find('button').trigger('click');

    expect(component.emitted('createTaskForColumn')).toBeTruthy();
    expect(component.emitted('createTaskForColumn')?.[0]).toContain(props.id);
  });
});

function createMockTasks(): KanbanTask[] {
  return [{
    id: '1',
    columnId: '1',
    title: 'Test Task',
    totalSubtasks: 10,
    completedSubtasks: 5
  },
  {
    id: '2',
    columnId: '1',
    title: 'Another Task',
    totalSubtasks: 5,
    completedSubtasks: 2
  },
  {
    id: '3',
    columnId: '1',
    title: 'Final Task',
    totalSubtasks: 3,
    completedSubtasks: 1
  }]
}
import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime'
import type { KanbanBoardProps } from './KanbanBoard.vue';
import { KanbanBoard } from '#components';

describe('KanbanBoard', () => {
  it('should render a list of columns and react to new columns creation', async () => {
    const props: KanbanBoardProps = {
      columns: createMockColumns(),
      tasks: createMockTasks()
    };
    
    const component = await mountSuspended(KanbanBoard, {
      props,
      route: '/test'
    });

    expect(component.text()).toContain('Test Column');
    expect(component.text()).toContain('Another Column');
    expect(component.text()).toContain('Final Column');

    // Test that the board reacts to new columns
    props.columns.push({
      id: '4',
      title: 'New Column',
      color: 'purple'
    });

    props.tasks.push({
      id: '10',
      columnId: '4',
      title: 'New Task',
      totalSubtasks: 5,
      completedSubtasks: 2
    });

    await component.setProps(props);

    expect(component.text()).toContain('New Column');
    expect(component.text()).toContain('New Task');
  });

  it('should emit a new column event when the "new column" button is clicked', async () => {
    const props: KanbanBoardProps = {
      columns: createMockColumns(),
      tasks: createMockTasks()
    };

    const component = await mountSuspended(KanbanBoard, {
      props,
      route: '/test'
    });

    const newColumnButton = component.find('#new-column-button');

    await newColumnButton.trigger('click');

    expect(component.emitted('newColumnCreation')).toBeTruthy();
  });

  it('should emit a new column event when a task is dragged to a new column', async () => {
    const props: KanbanBoardProps = {
      columns: createMockColumns(),
      tasks: createMockTasks()
    };

    const component = await mountSuspended(KanbanBoard, {
      props,
      route: '/test'
    });

    const column = component.find(`#new-column-button`);

    await column.trigger('drop', { dataTransfer: { getData: () => props.tasks[0].id } });

    expect(component.emitted('newColumnCreation')).toBeTruthy();
    expect(component.emitted('newColumnCreation')![0]).toContain(props.tasks[0].id);
  });
});

function createMockColumns() {
  return [{
    id: '1',
    title: 'Test Column',
    color: 'blue'
  }, {
    id: '2',
    title: 'Another Column',
    color: 'green'
  }, {
    id: '3',
    title: 'Final Column',
    color: 'red'
  }];
}

function createMockTasks() {
  return [{
    id: '1',
    columnId: '1',
    title: 'Test Task',
    totalSubtasks: 10,
    completedSubtasks: 5
  }, {
    id: '2',
    columnId: '1',
    title: 'Another Task',
    totalSubtasks: 5,
    completedSubtasks: 2
  }, {
    id: '3',
    columnId: '1',
    title: 'Final Task',
    totalSubtasks: 3,
    completedSubtasks: 1
  }, {
    id: '4',
    columnId: '2',
    title: 'Test Task',
    totalSubtasks: 10,
    completedSubtasks: 5
  }, {
    id: '5',
    columnId: '2',
    title: 'Another Task',
    totalSubtasks: 5,
    completedSubtasks: 2
  }, {
    id: '6',
    columnId: '2',
    title: 'Final Task',
    totalSubtasks: 3,
    completedSubtasks: 1
  }, {
    id: '7',
    columnId: '3',
    title: 'Test Task',
    totalSubtasks: 10,
    completedSubtasks: 5
  }, {
    id: '8',
    columnId: '3',
    title: 'Another Task',
    totalSubtasks: 5,
    completedSubtasks: 2
  }, {
    id: '9',
    columnId: '3',
    title: 'Final Task',
    totalSubtasks: 3,
    completedSubtasks: 1
  }];
}
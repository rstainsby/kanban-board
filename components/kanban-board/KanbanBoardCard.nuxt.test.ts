import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { KanbanBoardCard } from '#components';
import type { KanbanBoardCardProps } from './KanbanBoardCard.vue';

describe('KanbanBoardCard', () => {
  it('should render key content', async () => {
    const props: KanbanBoardCardProps = {
      id: '293e49a8-6014-4eaf-adbe-c7e3f5f4fe14',
      title: 'Test Card',
      subtasks: [
        { id: '1', taskId: '293e49a8-6014-4eaf-adbe-c7e3f5f4fe14', description: 'Subtask 1', status: 0 },
        { id: '2', taskId: '293e49a8-6014-4eaf-adbe-c7e3f5f4fe14', description: 'Subtask 2', status: 0 }
      ]
    }

    const component = await mountSuspended(KanbanBoardCard, {
      route: '/test',
      props
    })

    expect(component.text()).toContain('Test Card');
    expect(component.text()).toContain('0 of 2');
  });
})
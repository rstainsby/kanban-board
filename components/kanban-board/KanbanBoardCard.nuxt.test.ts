import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { KanbanBoardCard } from '#components';
import type { KanbanBoardCardProps } from './KanbanBoardCard.vue';

describe('KanbanBoardCard', () => {
  it('should render key content', async () => {
    const props: KanbanBoardCardProps = {
      id: '1',
      title: 'Test Card',
      totalSubtasks: 12,
      completedSubtasks: 5,
    }

    const component = await mountSuspended(KanbanBoardCard, {
      route: '/test',
      props
    })

    expect(component.text()).toContain('Test Card');
    expect(component.text()).toContain('5 of 12');
  });
})
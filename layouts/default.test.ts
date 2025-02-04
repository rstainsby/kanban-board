import { SideNavigation } from "#components";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { it, expect, describe } from "vitest";

describe.todo('Default SideNavigation Layout', () => {
  it('should render the number of boards', async () => {
    const boards = createMockBoards();
  
    const component = await mountSuspended(SideNavigation, {});
  
    expect(component.text()).toContain(`All Boards (${boards.length})`);
  });
  
  it('should render the new board button', async () => {
    const boards = createMockBoards();
    
    const component = await mountSuspended(SideNavigation, {
      
    });
  
    const newBoard = component.find('button');
  
    expect(newBoard.text()).toBe('Create New Board');
  });
  
  function createMockBoards() {
    throw new Error("Function not implemented.");
  }
});


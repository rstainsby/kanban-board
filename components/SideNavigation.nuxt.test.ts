import { mountSuspended, renderSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect, afterEach } from 'vitest';
import SideNavigation from './SideNavigation.vue';

describe('SideNavigation', () => {
  it('should render the theme toggle component', async () => {
    const component = await mountSuspended(SideNavigation, {
      props: {
        show: true,
      }
    });

    const themeToggle = component.find('#color-scheme');

    expect(themeToggle.isVisible()).toBeTruthy();
  });

  it('should be visible by default', async () => {
    const component = await mountSuspended(SideNavigation, {});

    expect(component.isVisible()).toBe(true);  
    expect(component.find('#btn-show-sidenav').isVisible()).toBe(false);
  });

  it('should hide the sidenav when the show prop is false', async () => {
    const component = await mountSuspended(SideNavigation, {
      props: {
        show: false,
      }
    });

    const sideNav = component.find('#side-navigation');

    expect(sideNav.attributes('class')).toContain('closed');
  });

  it('should hide the sidenav when the close button is clicked', async () => {
    const component = await mountSuspended(SideNavigation, {
      props: {
        show: true,
      }
    });

    component.find('#btn-hide-sidenav').trigger('click');

    await nextTick();
    
    const sideNav = component.find('#side-navigation');

    expect(sideNav.attributes('class')).toContain('closed');
  });

  it('should show the sidenav when the open button is clicked', async () => {
    const component = await mountSuspended(SideNavigation, {
      props: {
        show: false,
      }
    });

    component.find('#btn-show-sidenav').trigger('click');

    await nextTick();

    const sideNav = component.find('#side-navigation');

    expect(sideNav.attributes('class')).not.toContain('closed');
  });

  it('should emit an event when the sidenav is closed', async () => {
    const component = await renderSuspended(SideNavigation, {
      props: {
        show: true,
      }
    });

    (await component.findByLabelText('Hide Sidenav')).click();

    await nextTick();

    expect(component.emitted('close')[0]).toBeTruthy();
  });

  it('should emit an event when the sidenav is opened', async () => {
    const component = await renderSuspended(SideNavigation, {
      props: {
        show: false,
      }
    });

    (await component.findByLabelText('Show Sidenav')).click();

    await nextTick();

    expect(component.emitted('open')[0]).toBeTruthy();
  });
});

function createMockBoards() {
  return [
    { id: 'b1', name: 'Board 1' },
    { id: 'b2', name: 'Board 2' },
    { id: 'b3', name: 'Board 3' },
  ];
}
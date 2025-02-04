<template>
  <div :class="$style['top-navigation-layout']">
    <div :class="$style['page-header']">

    </div>

    <SideNavigation @open="() => sideNavOpen = true" @close="() => sideNavOpen = false">
      <template #content>
        <Menu :model="boards" class="w-full md:w-60" :pt="{
          submenuLabel: {
            style: 'padding-left: 1.9rem; font-size: 0.9rem;'
          },
          root: {
            style: 'border: none;'
          }
        }">
          <template #item="{ item }">
            <NuxtLink :to="item.to" :class="$style.link" :active-class="$style['link--active']">
              <NuxtIcon name="icon-board"/>
              {{ item.label }}
            </NuxtLink>
          </template>
        </Menu>
      </template>
    </SideNavigation>
    
    <div ref="pageContent" :class="[$style['page-content'], sideNavOpen ? $style['page-content--sidenav-open'] : '']">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const sideNavOpen = ref(true);

  const { data: boardsRaw, error } = useFetch('/api/boards');

  const boards = computed(() => [{
    label: `All Boards (${boardsRaw.value?.length || 0})`,
    items: boardsRaw.value?.map((board: any) => ({
      label: board.name,
      to: `/board-${board.id}`
    })) || []
  }]);
</script>

<style module>
  .top-navigation-layout {
    position: relative;
    min-height: 90vh;
    max-height: 90vh;
  }

  .page-header {
    color: black;
    padding: 1rem;
  }

  .page-content {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    transition: left 0.3s;
    padding: 24px;
  }

  .page-content--sidenav-open {
    left: 20rem;
  }

  .link {
    display: flex;
    gap: 1rem;
    align-items: center;
    text-decoration: none;
    font-size: 1rem;
    height: 2.5rem;
    background-color: transparent;
    border-top-right-radius: 20rem;
    border-bottom-right-radius: 20rem;
    width: 90%;
    padding-left: 2rem;
    color: var(--p-text-color);
  }

  .link--active {
    background-color: var(--p-primary-color);
    color: white;
  }
</style>
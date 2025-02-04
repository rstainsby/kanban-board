<template>
  <div>
    <div id="side-navigation" :class="sideNavigationClasses" :aria-disabled="!showSidenav" data-testid="side-navigation">
      <div style="display: flex; flex-direction: column; height: 100%;">
        <slot name="content">
          
        </slot>

        <div :class="classes.footer">
            <TheThemeToggle />
            <Button id="btn-hide-sidenav" severity="primary" size="large" rounded aria-label="Hide Sidenav" @click="onClose">
            <template #icon>
              <NuxtIcon name="icon-hide-sidenav" :class="classes.icon"/>
            </template>
          </Button>
        </div>
      </div>
    </div>
    <Button id="btn-show-sidenav" :class="classes['side-nav-toggle']" severity="primary" aria-label="Show Sidenav" size="large" :hidden="showSidenav" @click="onOpen">
        <template #icon>
          <NuxtIcon name="icon-show-sidenav" :class="classes.icon"/>
        </template>
    </Button>
  </div>
</template>

<script setup lang="ts">
interface SideNavigationProps {
  show?: boolean
}

const props = withDefaults(defineProps<SideNavigationProps>(), {
  show: true
});

const emit = defineEmits<{
  (e: 'open'): void,
  (e: 'close'): void
}>();

const showSidenav = ref(props.show);
const classes = useCssModule();

const sideNavigationClasses = computed(() => ([
  classes['side-navigation'],
  !showSidenav.value && classes['side-navigation--closed']
]));

function onOpen() {
  emit('open');
  showSidenav.value = true;
}

function onClose() {
  emit('close');
  showSidenav.value = false;
}
</script>

<style module>
  .side-navigation {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 20rem;
    background-color: var(--p-overlay-modal-background);
    border-right: 2px solid var(--p-overlay-modal-border-color);
    z-index: 1000;
    padding: 1rem 2rem 2rem 0;
    transition-property: left, opacity;
    transition-duration: 0.3s;
    transition-delay: 0s 0.3s;
  }

  .side-navigation--closed {
    left: -20rem;
  }

  .side-nav-toggle {
    position: fixed;
    bottom: 3rem;
    left: 0;
    z-index: 1000;
    border-top-right-radius: 20rem;
    border-bottom-right-radius: 20rem;
    width: 3.5rem;
    left: -3.5rem;
    transition: left 0.3s;
    color: white;
  }

  .side-navigation--closed + .side-nav-toggle {
    left: 0;
  }

  .icon {
    font-size: 1.4rem;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .footer {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 2rem;
  }

  .footer > *:nth-child(1) {
    width: 60%;
  }

  .footer > button {
    color: white;
  }
</style>
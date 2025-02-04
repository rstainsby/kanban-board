<template>
    <fieldset id="color-scheme" data-testid="theme-toggle" :class="$style['theme-selector']">
    <div>
      <input 
        type="radio" 
        id="system-theme" 
        :class="[$style['no-show'], $style['theme-input'], $style['theme-input--system']]"
        name="color-scheme" 
        value="system" 
        v-model="theme"
        @change="changeTheme(theme)">
      <label for="system-theme" :class="$style['theme-label']" aria-label="System theme">
        <NuxtIcon name="icon-computer" :class="$style['theme-icon']" />
      </label>
    </div>

    <div>
      <input 
        type="radio" 
        id="light-theme" 
        :class="[$style['no-show'], $style['theme-input'], $style['theme-input--light']]"
        name="color-scheme" 
        value="light"
        v-model="theme" 
        @change="changeTheme(theme)">
      <label for="light-theme" :class="$style['theme-label']" aria-label="Light theme">
        <NuxtIcon name="icon-light-theme" :class="$style['theme-icon']"/>
      </label>
    </div>

    <div>
      <input 
        type="radio" 
        id="dark-theme" 
        :class="[$style['no-show'], $style['theme-input'], $style['theme-input--dark']]"
        name="color-scheme" 
        value="dark" 
        v-model="theme" 
        @change="changeTheme(theme)">
      <label for="dark-theme" :class="$style['theme-label']" aria-label="Dark theme">
        <NuxtIcon name="icon-dark-theme" :class="$style['theme-icon']"/>
      </label>
    </div>
  </fieldset>
</template>

<script lang="ts" setup>
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  let theme = ref(localStorage.getItem('theme') || systemTheme);

  document.documentElement.dataset.theme = theme.value;

  function changeTheme(theme: string) {
    if (theme === 'system') {
      document.documentElement.dataset.theme = undefined;
      localStorage.removeItem('theme');
    } else {
      document.documentElement.dataset.theme = theme;
      localStorage.setItem('theme', theme);
    }
  }
</script>

<style module>
  .theme-selector {
    --icon-size: 1.5rem;

    container-type: size;
    container-name: theme-selector;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 4px 0;
    height: calc(var(--icon-size) + 0.5rem);
    width: calc((var(--icon-size) * 3) + 2.8rem);
    padding: 0.25rem 0.75rem;
    cursor: pointer;
    border: none;
    border-radius: 100px;
    border: 1px solid var(--p-primary-color);
    background-color: var(--theme-selector-background, var(--p-surface-100));
    color: var(--p-text-color);
    fill: var(--p-text-color);
  }

  .theme-selector:active, 
  .theme-selector:focus,
  .theme-selector:focus-visible,
  .theme-selector:focus-within {
    outline: 1px solid var(--p-primary-color);
  }

  .theme-label {
    position: relative;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-radius: var(--border-radius);
    width: max-content;
    font-size: var(--fs-icons);
    cursor: pointer;
  }

  .theme-icon {
    z-index: 3;
    background-color: transparent;
  }

  .theme-icon > svg {
    width: var(--icon-size);
    height: var(--icon-size);
    margin-bottom: 0; /* Overwriting default style from nuxt-icons package */
  }

  .theme-input:checked + .theme-label {
    color: var(--p-surface-50);
    fill: var(--p-surface-50);
  }

  .theme-selector::after {
    position: absolute;
    content: "";
    width: calc(var(--icon-size) + 0.75rem);
    height: calc(var(--icon-size) + 0.25rem);
    border-radius: 100px;
    background-color: var(--p-primary-color);
    z-index: 2;
    left: 0;
    box-shadow: 1px 1px 0px rgba(0, 0, 0, 0.3);
    transition: 0.2s linear;
  }

  .theme-selector:has(.theme-input--dark:checked).theme-selector::after {
    transform: translateX(calc(100cqw - var(--icon-size) + 0.4rem));
  }

  .theme-selector:has(.theme-input--light:checked).theme-selector::after {
    transform: translateX(calc(50cqw - (var(--icon-size) / 2) + 0.325rem));
  }

  .theme-selector:has(.theme-input--system:checked).theme-selector::after {
    transform: translateX(0.35rem);
  }

  .theme-input:focus {
    outline: var(--p-primary-color);
  }

  .no-show {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  :root[data-theme='dark'] .theme-selector {
    --theme-selector-background: var(--p-surface-700);
  }

  @media (prefers-color-scheme:dark) {
    :root[data-theme="system"] .theme-selector {
      --theme-selector-background: var(--p-surface-700);
    }    
  }
</style>
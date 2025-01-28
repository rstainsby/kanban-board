<template>
  <button :class="baseButtonClassNames" v-bind="props">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
type Variant = 'primary' | 'secondary' | 'destructive';
type Size = 'small' | 'regular';

interface BaseButtonProps {
  variant: Variant
  size?: Size
  fullWidth?: boolean
}

const props = withDefaults(defineProps<BaseButtonProps>(), {
  variant: 'primary',
  size: 'regular',
  fullWidth: false
});

const style = useCssModule();

const baseButtonClassNames = computed(() => {
  const variantClass = style[props.variant];
  const sizeClass = style[props.size];
  const fullWidthClass = props.fullWidth && style['full-width'];

  return [
    variantClass,
    sizeClass,
    fullWidthClass
  ]
})
</script>

<style module>
  button {
    font-size: var(--fs-heading-md);
    font-weight: 600;
    border-radius: 1.5rem;
    padding: 0.75rem 1rem;
    width: fit-content;
    cursor: pointer;
    transition: background-color 0.2s ease-in;
  }

  .primary {
    background-color: hsl(var(--cl-primary));
    color: hsl(var(--cl-primary-text));
  }

  button:hover.primary {
    background-color: hsl(var(--cl-primary-hover));
  }

  .secondary {
    background-color: hsla(var(--cl-secondary));
    color: hsl(var(--cl-secondary-text));
  }

  button:hover.secondary {
    background-color: hsla(var(--cl-secondary-hover));
  }

  .destructive {
    background-color: hsl(var(--cl-destructive));
    color: hsl(var(--cl-destructive-text));
  }

  button:hover.destructive {
    background-color: hsl(var(--cl-destructive-hover));
  }

  .small {
    font-size: var(--fs-body-md);
    font-weight: 600;
  }

  .full-width {
    width: 100%;
  }
</style>
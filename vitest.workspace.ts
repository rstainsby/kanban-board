import { defineWorkspace } from 'vitest/config';

/**
 * Run nuxt specific test files in a Nuxt environment
 */
export default defineWorkspace([
  {
    extends: './vitest.config.ts',
    test: {
      include: ['**/*.nuxt.test.ts'],
      environment: 'nuxt',
      name: 'nuxt',
      setupFiles: ['./vitest.nuxt-runtime.config.ts'],
    }
  },
]);
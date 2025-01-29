// This file is used to configure the Vue Test Utils runtime specifically for Nuxt tests
import { config } from '@vue/test-utils';

/**
 * A known core bug in Vue Test Utils is that it doesn't support the use of $style in component templates.
 * This is a workaround to prevent the error "Cannot read property 'replace' of undefined" when using $style.
 * More on this issue and the temporary fix here https://github.com/nuxt/test-utils/issues/910
 */
config.global.mocks.$style = {};
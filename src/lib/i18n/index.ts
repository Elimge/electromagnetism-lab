// src/lib/i18n/index.ts

/**
 * This module configures and initializes the `svelte-i18n` library,
 * setting up the internationalization for the entire application.
 * This file should be imported once at the root of the app (e.g., in the root +layout.ts).
 */
import { browser } from '$app/environment';
import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

/**
 * Registers the supported language locales.
 *
 * Using a dynamic import (`() => import(...)`) is a crucial optimization.
 * It ensures that the JSON file for a specific language is only loaded
 * by the client when that language is actually requested, reducing the initial
 * bundle size of the application.
 */
register('en', () => import('../locales/en.json'));
register('es', () => import('../locales/es.json'));
register('pt', () => import('../locales/pt.json'));

/**
 * Initializes the i18n service with a configuration object.
 */
init({
	/**
	 * The fallback locale to use if the user's browser language is not supported.
	 * For example, if a user's browser is set to German ('de'), the app will fall back
	 * to English as specified here.
	 */
	fallbackLocale: 'en',

	/**
	 * Determines the initial locale when the application first loads.
	 *
	 * - `browser`: This SvelteKit environment variable is `true` only on the client-side.
	 * - `getLocaleFromNavigator()`: A utility from `svelte-i18n` that reads the `navigator.language` property.
	 *
	 * This logic ensures that we attempt to detect the browser's language on the client,
	 * but default to 'en' during server-side rendering (SSR) where the `navigator` object is not available.
	 */
	initialLocale: browser ? getLocaleFromNavigator() : 'en'
});

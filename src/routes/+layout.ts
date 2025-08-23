// src/routes/+layout.ts
/**
 * This is the layout load function for the entire application.
 * SvelteKit runs this function before rendering any page.
 * Its primary purpose here is to handle initial setup tasks.
 */
import { waitLocale } from 'svelte-i18n';
import type { LayoutLoad } from './$types';
import '$lib/i18n'; // This ensures the i18n library is initialized.

/**
 * Prerendering instruction for SvelteKit.
 * Setting `prerender = true` tells SvelteKit to generate all pages as static HTML
 * files during the build process. This is ideal for a site with no dynamic
 * server-side logic, like this project, as it results in a very fast user experience.
 */
export const prerender = true;

/**
 * The main load function.
 * It's executed before the layout (and the page) is rendered.
 */
export const load: LayoutLoad = async () => {
	// `waitLocale()` is a function from svelte-i18n.
	// `await`ing it ensures that the correct language file (e.g., en.json or es.json)
	// has been loaded before the UI is shown to the user. This prevents a "flash"
	// of untranslated content.
	await waitLocale();
};

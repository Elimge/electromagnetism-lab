<script lang="ts">
	/**
	 * This is the root layout component for the entire application.
	 * Every page is rendered inside the `<slot />` of this component.
	 * It defines the global structure (Header + main content) and handles
	 * global concerns like theme application and importing global styles.
	 */
	import { theme } from '$lib/stores/themeStore.ts';
	import { browser } from '$app/environment';
	import Header from '$lib/components/shared/Header.svelte';
	import '../app.css'; // Import global CSS styles.

	// --- Reactive Theme Application ---
	$: if (browser) {
		// This reactive statement listens for changes in the `$theme` store.
		// When `$theme` changes, it sets the `data-theme` attribute on the `<body>`.
		// The CSS in `app.css` uses this attribute to apply the correct theme variables.
		// The `if (browser)` check ensures this code only runs on the client-side,
		// as there is no `document` object on the server
		document.body.setAttribute('data-theme', $theme);
	}
</script>

<!-- src/routes/+layout.svelte -->
<!--
  The `<svelte:head>` element allows us to inject content into the <head>
  of the HTML document. Here, we're setting a default title for all pages.
  Individual pages can override this title if they also use `<svelte:head>`.
-->
<svelte:head>
	<title>Electromagnetism Lab</title>
</svelte:head>
<div class="app-container">
	<Header />

	<!-- The `<slot />` is the placeholder where SvelteKit will render the current page's content. -->
	<main>
		<slot />
	</main>
</div>

<style>
	.app-container {
		display: flex;
		flex-direction: column;
		height: 100svh; /* Use 100% of the viewport height. */
		overflow: hidden; /* Prevents scrollbars on the main container. */
	}
	main {
		flex-grow: 1; /* Allows the main content area to fill the remaining space. */
		position: relative; /* Necessary for child absolute positioning (like the simulation canvas). */
		overflow: hidden;
		min-height: 0; /* A flexbox trick to ensure content fits within the container. */
	}
</style>

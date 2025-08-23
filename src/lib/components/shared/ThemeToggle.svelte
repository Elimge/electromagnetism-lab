<!-- src/lib/components/shared/ThemeToggle.svelte -->
<script lang="ts">
	/**
	 * A simple button component that toggles the application's color theme
	 * between 'light' and 'dark'.
	 * It directly subscribes to and updates the global `theme` store.
	 *
	 * @component
	 */
	import { theme } from '$lib/stores/themeStore.ts';

	/**
	 * Toggles the value of the `theme` store between 'light' and 'dark'.
	 * Svelte's '$' prefix provides a convenient way to both read and write to the store.
	 */
	function toggleTheme() {
		// Svelte's '$store' syntax allows modify the store directly
		$theme = $theme == 'light' ? 'dark' : 'light';
	}
</script>

<!-- 
  The aria-label is important for accessibility, providing a description for screen readers.
  Note: This label is currently hardcoded in Spanish. For full bilingual support,
  it could be internationalized using the i18n store, e.g., aria-label={$_('theme.toggle_label')}.
-->
<button on:click={toggleTheme} aria-label="Toggle theme">
	{#if $theme === 'light'}
		<span>🌙</span>
	{:else}
		<span>☀️</span>
	{/if}
</button>

<style>
	button {
		background: none;
		border: 1px solid var(--border-color);
		border-radius: 50%;
		width: 40px;
		height: 40px;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1.2rem;
		transition: background-color 0.2s;
	}
	button:hover {
		/* Using a semi-transparent overlay works well for both light and dark themes. */
		background-color: rgba(128, 128, 128, 0.1);
	}
</style>

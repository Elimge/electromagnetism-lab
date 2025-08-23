<!-- src/lib/components/shared/LanguageSelector.svelte -->
<script lang="ts">
	/**
	 * A component that displays buttons to switch the application's language.
	 * It interacts directly with the `locale` store from the `svelte-i18n` library.
	 *
	 * @component
	 */
	import { locale } from 'svelte-i18n';
</script>

<div class="language-selector">
	<!--
    The component reads the current locale from the store (`$locale`) to apply the 'active' class.
    Clicking a button writes the new language code ('es' or 'en') directly back into the store,
    triggering a reactive update across the entire application.
    -->
	<button class:active={$locale === 'es'} on:click={() => ($locale = 'es')}>ES</button>
	<button class:active={$locale === 'en'} on:click={() => ($locale = 'en')}>EN</button>
</div>

<style>
	.language-selector {
		display: flex;
		border: 1px solid var(--border-color);
		border-radius: 20px;
		overflow: hidden; /* Ensures the child button corners are clipped by the parent's border-radius. */
	}
	button {
		padding: 6px 12px;
		border: none;
		background-color: transparent;
		color: var(--text-secondary);
		cursor: pointer;
		transition: all 0.2s;
	}
	button:hover {
		background-color: rgba(128, 128, 128, 0.2);
	}
	button.active {
		background-color: var(--text-primary);
		color: var(--bg-primary);
		font-weight: bold;
	}
</style>

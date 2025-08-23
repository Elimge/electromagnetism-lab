<!-- src/lib/components/ScenarioSelector.svelte -->
<script lang="ts">
	/**
	 * A set of buttons that allows the user to switch between the different
	 * physics scenarios (e.g., straight wire, circular loop).
	 * It directly modifies the `activeSimulation` store.
	 *
	 * @component
	 */
	import { activeSimulation } from '$lib/stores/simulationStore';
	import { _ } from 'svelte-i18n';
</script>

<div class="selector-container">
	<!--
    Each button represents a specific simulation type.
    - The `active` class is applied based on the current value of the `$activeSimulation` store.
    - Clicking a button writes the corresponding simulation type string directly into the store.
    - The button labels are sourced from the i18n store for bilingual support.
    -->
	<button
		class:active={$activeSimulation === 'infinite_wire'}
		on:click={() => ($activeSimulation = 'infinite_wire')}
	>
		{$_('scenario.wire')}
	</button>
	<button
		class:active={$activeSimulation === 'circular_loop'}
		on:click={() => ($activeSimulation = 'circular_loop')}
	>
		{$_('scenario.loop')}
	</button>
	<button
		class:active={$activeSimulation === 'solenoid'}
		on:click={() => ($activeSimulation = 'solenoid')}
	>
		{$_('scenario.solenoid')}
	</button>
</div>

<style>
	.selector-container {
		display: flex;
		gap: 8px;
		margin-top: 1rem;
		/* Using a CSS variable for the border color makes it theme-aware. */
		border-top: 1px solid var(--border-color);
		padding-top: 1rem;
	}
	button {
		flex-grow: 1; /* Ensures buttons share the available space equally. */
		padding: 8px;
		/* 
        The following colors are hardcoded, which might not be ideal for theme changes.
        Consider replacing them with CSS variables if more granular theme control is needed in the future.
        */
		background-color: #333;
		color: white;
		border: 1px solid #555;
		border-radius: 4px;
		cursor: pointer;
		transition: background-color 0.2s;
	}
	button:hover {
		background-color: #444;
	}
	button.active {
		background-color: #007bff; /* A distinct color to indicate the active selection. */
		border-color: #007bff;
		font-weight: bold;
	}
</style>

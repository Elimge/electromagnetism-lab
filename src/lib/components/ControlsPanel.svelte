<!-- src/lib/components/ControlsPanel.svelte -->
<script lang="ts">
	/**
	 * A UI panel that groups all the interactive controls for the simulation.
	 * It includes the current slider and the scenario selector. This component
	 * acts as a bridge, forwarding events from its children to its parent.
	 *
	 * @component
	 *
	 * @event currentchange - Dispatched when the current slider's value changes.
	 * @event currentchange.detail.value - The new numeric value for the current.
	 */
	import { createEventDispatcher } from 'svelte';
	import Slider from './shared/Slider.svelte';
	import ScenarioSelector from './ScenarioSelector.svelte';
	import { _ } from 'svelte-i18n';

	// Local state for the current, with a default value.
	let current = 5;

	const dispatch = createEventDispatcher<{ currentchange: { value: number } }>();

	/**
	 * Listens for the 'change' event from the child Slider component,
	 * updates the local `current` state, and then re-dispatches the value
	 * upwards to the parent component via the `currentchange` event.
	 * @param event The custom event from the Slider component.
	 */
	function handleCurrentChange(event: CustomEvent<{ value: number }>) {
		// Update the local variable
		current = event.detail.value;
		// Re-send the event on the father component
		dispatch('currentchange', { value: current });
	}
</script>

<div class="panel">
	<h3>{$_('controls.title')}</h3>
	<Slider
		label={$_('controls.current')}
		bind:value={current}
		min={-10}
		max={10}
		step={0.1}
		unit={$_('controls.unit')}
		on:change={handleCurrentChange}
	/>

	<ScenarioSelector />
</div>

<style>
	/* Default styles for desktop: a floating panel in the top-left corner. */
	.panel {
		position: absolute;
		top: 10px;
		left: 10px;
		z-index: 10;
		background-color: var(--bg-panel);
		border: 1px solid var(--border-color);
		color: var(--text-primary);
		padding: 1rem;
		border-radius: 8px;
		font-family: sans-serif;
		width: 250px;
		transition: all 0.3s ease;
	}
	h3 {
		margin-top: 0;
		border-bottom: 1px solid var(--border-color);
		padding-bottom: 0.5rem;
	}
	:global(.slider-container) {
		color: var(--text-primary);
	}
	/* --- Responsive Styles for Mobile Devices --- */
	@media (max-width: 767px) {
		.panel {
			/* On mobile, transform the panel into a bottom bar. */
			top: auto;
			bottom: 0;
			left: 0;
			width: 100%;
			border-radius: 12px 12px 0 0;
			box-sizing: border-box;

			/* Arrange controls in a column for better usability. */
			display: flex;
			flex-direction: column;
			gap: 0.75rem;
			padding: 0.75rem 1rem;
		}

		h3 {
			/* Hide the "Controls" title on mobile to save vertical space. */
			display: none;
		}

		/* Using :global() to style a child component from a parent. */
		:global(.selector-container) {
			margin-top: 0;
			border-top: none;
			padding-top: 0;
		}
	}

	/* --- Responsive Styles for Tablet Devices --- */
	@media (min-width: 768px) and (max-width: 1024px) {
		.panel {
			width: 220px;
			padding: 0.8rem;
		}
		h3 {
			font-size: 1rem;
		}
		:global(.slider-container label) {
			font-size: 0.8em;
		}
	}
</style>

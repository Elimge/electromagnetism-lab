<!-- src/lib/components/shared/Slider.svelte -->
<script lang="ts">
	/**
	 * A reusable slider component for numeric inputs.
	 * It displays a label with the current value and a unit.
	 *
	 * @component
	 *
	 * @prop {string} label - The text label to display above the slider. Also used as the `id` for the input.
	 * @prop {number} value - The current numeric value of the slider. This can be bound to from a parent component.
	 * @prop {number} [min=0] - The minimum value of the slider.
	 * @prop {number} [max=10] - The maximum value of the slider.
	 * @prop {number} [step=0.1] - The increment step of the slider.
	 * @prop {string} [unit=""] - The unit to display next to the value (e.g., "A", "m").
	 *
	 * @event change - Dispatched on every `input` event from the slider.
	 * @event change.detail - The event detail object.
	 * @event change.detail.value - The new numeric value of the slider.
	 */
	import { createEventDispatcher } from 'svelte';

	// --- Props ---
	export let label: string;
	export let value: number;
	export let min: number = 0;
	export let max: number = 10;
	export let step: number = 0.1;
	export let unit: string = '';

	// --- Event Dispatcher ---
	// Typed dispatcher ensures that we only emit a 'change' event with the correct payload structure.
	const dispatch = createEventDispatcher<{ change: { value: number } }>();

	/**
	 * Forwards the slider's new value to the parent component via the `change` event.
	 * This function is triggered on the `input` event for real-time updates.
	 */
	function handleChange() {
		dispatch('change', { value });
	}
</script>

<div class="slider-container">
	<label for={label}>{label}: {value.toFixed(2)} {unit}</label>
	<input type="range" id={label} {min} {max} {step} bind:value on:input={handleChange} />
</div>

<style>
	.slider-container {
		display: flex;
		flex-direction: column;
		gap: 4px;
		font-family: sans-serif;
		color: var(--text-primary);
	}
	label {
		font-size: 0.9em;
	}
	input[type='range'] {
		cursor: pointer;
	}
</style>

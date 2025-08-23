<!-- src/lib/components/SimulationView.svelte -->
<script lang="ts">
	/**
	 * The main component that displays the 3D electromagnetism simulation.
	 * It uses Three.js for rendering and handles the communication
	 * between the Svelte UI and the 3D scene logic.
	 *
	 * @component
	 *
	 * @prop {number} current - The value of the current (in Amperes) to apply to the simulation.
	 */
	import { onMount } from 'svelte';
	import { createScene } from '$lib/scenes/scene';

	/**
	 * The current (in Amperes) applied to the simulation.
	 * Changes to this prop trigger updates in the 3D scene.
	 */
	export let current: number;

	// A reference to the HTML canvas element where Three.js will render the scene.
	let canvas: HTMLCanvasElement;

	// Function to update the scene's state (e.g., the value of the current).
	let sceneUpdater: (newState: { current: number }) => void;

	// Function to clean up resources and event listeners when the component is destroyed.
	let sceneDestroyer: () => void;

	// --- Lifecycle: onMount ---
	onMount(() => {
		if (canvas) {
			// Initialize the Three.js scene by passing in the canvas element.
			// The createScene function returns two functions: 'update' and 'destroy'.
			const { update, destroy } = createScene(canvas);
			sceneUpdater = update;
			sceneDestroyer = destroy;
		}
		// This return function runs when the component is unmounted.
		return () => {
			// Call the 'destroy' function to clean up resources and event listeners.
			if (sceneDestroyer) {
				sceneDestroyer();
			}
		};
	});

	// --- Reactive Statement: Update the scene when the 'current' prop changes ---
	$: if (sceneUpdater) {
		// The 'sceneUpdater' function is called whenever the 'current' prop changes.
		// This is how we pass new values (like the current) into the Three.js scene.
		sceneUpdater({ current });
	}
</script>

<div class="simulation-container">
	<canvas bind:this={canvas}></canvas>
</div>

<style>
	.simulation-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1; /* Place behind the controls panel */
	}
	canvas {
		width: 100%;
		height: 100%;
		display: block; /* Removes extra spacing under the canvas. */
	}
</style>

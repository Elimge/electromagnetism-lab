<!-- src/lib/components/SimulationView.svelte -->
<script lang="ts">
    import { onMount } from "svelte";
    import { createScene } from "$lib/scenes/scene";

    // Accept current as a prop
    export let current: number; 

    let canvas: HTMLCanvasElement;

    // Save the function 'update' to return the scene.
    let sceneUpdater: (newState: { current: number }) => void;

    // Cleaning function 
    let sceneDestroyer: () => void;

    onMount(() => {
        if (canvas) {
            // Capture the function 'update' and 'destroyer' to create the scene 
            const { update, destroy } = createScene(canvas);
            sceneUpdater = update;
            sceneDestroyer = destroy; 

        } 
        return () => {
            // Cleanup logic if the component is destroyed
            if (sceneDestroyer) {
                sceneDestroyer(); 
            }
        }
    });

    // The magic of Svelte! This is a "reactive statement."
    // Every time the 'current' property changes, this block of code will execute.
    $: if (sceneUpdater) {
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
		z-index: 1; /* Layout inferior */
	}
	canvas {
		width: 100%;
		height: 100%;
		display: block;
	}
</style>

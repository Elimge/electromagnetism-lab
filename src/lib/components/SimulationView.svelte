<!-- src/lib/components/SimulationView.svelte -->
<script lang="ts">
    import { onMount } from "svelte";
    import { createScene } from "$lib/scenes/scene";

    // Accept current as a prop
    export let current: number; 

    let canvas: HTMLCanvasElement;

    // Save the function 'update' to return the scene.
    let sceneUpdater: (newState: { current: number }) => void;

    onMount(() => {
        if (canvas) {
            // Capture the function 'update' to create the scene 
            const { update } = createScene(canvas);
            sceneUpdater = update

        } 
        return () => {
            // Cleanup logic if the component is destroyed
        }
    });

    // The magic of Svelte! This is a "reactive statement."
    // Every time the 'current' property changes, this block of code will execute.
    $: if (sceneUpdater) {
        sceneUpdater({ current });
    }
</script>

<canvas bind:this={canvas}></canvas>

<style> 
    canvas {
        width: 100%;
        height: 100%;
        display: block; 
    }
</style>
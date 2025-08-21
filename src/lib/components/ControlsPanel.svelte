<!-- src/lib/components/ControlsPanel.svelte -->
 <script lang="ts">
    import { createEventDispatcher } from "svelte";
    import Slider from "./shared/Slider.svelte";
    import ScenarioSelector from "./ScenarioSelector.svelte";

    let current = 5;

    const dispatch = createEventDispatcher<{ currentchange: { value: number } }>();

    function handleCurrentChange(event: CustomEvent<{ value: number }>) {
        // Update the local variable 
        current = event.detail.value;
        // Re-send the event on the father component 
        dispatch("currentchange", { value: current });
    }
 </script>

<div class="panel">
        <h3>Controles</h3>
        <Slider
                label="Corriente"
                bind:value={current}
                min={-10}
                max={10}
                step={0.1}
                unit="A"
                on:change={handleCurrentChange}
        />

        <ScenarioSelector />

</div>

<style>
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
    }
    h3 {
        margin-top: 0;
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 0.5rem;
    }
    :global(.slider-container) {
        color: var(--text-primary);
    }
</style>
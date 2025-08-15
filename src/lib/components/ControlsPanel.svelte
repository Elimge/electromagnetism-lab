<!-- src/lib/components/ControlsPanel.svelte -->
 <script lang="ts">
    import { createEventDispatcher } from "svelte";
    import Slider from "./shared/Slider.svelte";

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
</div>

<style>
    .panel {
        position: absolute;
        top: 10px;
        left: 10px;
        background-color: rgba(40, 40, 40, 0.8);
        padding: 1rem;
        border-radius: 8px;
        color: white; 
        font-family: sans-serif;
        width: 250px;
        border: 1px solid rgba(255, 255, 255, 0.2);
    }
    h3 {
        margin-top: 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        padding-bottom: 0.5rem;
    }
</style>
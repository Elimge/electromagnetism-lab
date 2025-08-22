<!-- src/lib/components/shared/Slider.svelte -->
<script lang="ts">
    import { createEventDispatcher } from "svelte";

    // Params to receive 
    export let label: string;
    export let value: number;
    export let min: number = 0;
    export let max: number = 10;
    export let step: number = 0.1;
    export let unit: string = "";

    // We tell TypeScript that this dispatcher can ONLY emit
    // one 'change' event, and that its payload must be { value: number }.
    const dispatch = createEventDispatcher<{ change: { value: number } }>();

    // This function fires every time the slider moves
    // and emits a 'change' event with the new value.
    function handleChange() {
        dispatch("change", { value });
    }
</script>

<div class="slider-container">
    <label for="{label}">{label}: {value.toFixed(2)} {unit}</label>
    <input 
        type="range"
        id={label}
        {min}
        {max}
        {step}
        bind:value
        on:input={handleChange}
        />
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
    input[type="range"] {
        cursor: pointer;
    }
</style>
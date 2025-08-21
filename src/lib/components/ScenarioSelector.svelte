<!-- src/lib/components/ScenarioSelector.svelte -->
<script lang="ts">
    import { activeSimulation } from "$lib/stores/simulationStore";
    import { _ } from "svelte-i18n"; 

</script>

<div class="selector-container">
    <button class:active={$activeSimulation === "infinite_wire"} on:click={() => ($activeSimulation = "infinite_wire")}>
        {$_("scenario.wire")}
    </button>
    <button class:active={$activeSimulation === "circular_loop"} on:click={() => ($activeSimulation = "circular_loop")}>
        {$_("scenario.loop")} 
    </button>
    <button class:active={$activeSimulation === "solenoid"} on:click={() => ($activeSimulation = "solenoid")}>
        {$_("scenario.solenoid")}
    </button>
</div>

<style>
    .selector-container {
        display: flex;
        gap: 8px; 
        margin-top: 1rem;
        border-top: 1px solid rgba(255, 255, 255, 0.2);
        padding-top: 1rem;
    }
    button {
        flex-grow: 1;
        padding: 8px;
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
        background-color: #007bff;
        border-color: #007bff;
        font-weight: bold;
    }
</style>
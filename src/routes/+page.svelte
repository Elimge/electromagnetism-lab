<!-- src/routes/+page.svelte -->
<script lang="ts">
    import SimulationView from "$lib/components/SimulationView.svelte";
    import ControlsPanel from "$lib/components/ControlsPanel.svelte";

    let simulationCurrent = 5; 

    function handleCurrentChange(event: CustomEvent<{ value: number }>) {
        simulationCurrent = event.detail.value;
    }
</script>

<SimulationView current={simulationCurrent} />
<ControlsPanel on:currentchange={handleCurrentChange} />

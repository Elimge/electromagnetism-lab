<!-- src/routes/+page.svelte -->
<script lang="ts">
    import SimulationView from "$lib/components/SimulationView.svelte";
    import ControlsPanel from "$lib/components/ControlsPanel.svelte";

    let simulationCurrent = 5; 

    function handleCurrentChange(event: CustomEvent<{ value: number }>) {
        simulationCurrent = event.detail.value;
    }
</script>

<main>
    <SimulationView current={simulationCurrent} />
    <ControlsPanel on:currentchange={handleCurrentChange} />
</main>

<style>
    main {
        width: 100vw;   /* 100% del ancho de la ventana */
        height: 100vh;  /* 100% del alto de la ventana */
        overflow: hidden;   /* Evita barras de scroll innecesarias */
        position: relative; /* Correct position of the panel */ 
    }

    /* Global styles to remove the 'margin' and 'padding' by deffect of the browser */   
    :global(body) {
        margin: 0;
        padding: 0;
    }
</style>
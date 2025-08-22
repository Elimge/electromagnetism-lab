<!-- src/lib/components/ControlsPanel.svelte -->
 <script lang="ts">
    import { createEventDispatcher } from "svelte";
    import Slider from "./shared/Slider.svelte";
    import ScenarioSelector from "./ScenarioSelector.svelte";
    import { _ } from "svelte-i18n"; 

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
        <h3>{$_("controls.title")}</h3>
        <Slider
                label={$_("controls.current")}
                bind:value={current}
                min={-10}
                max={10}
                step={0.1}
                unit={$_("controls.unit")}
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
        transition: all 0.3s ease;
    }
    h3 {
        margin-top: 0;
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 0.5rem;
    }
    :global(.slider-container) {
        color: var(--text-primary);
    }
    /* --- INICIA LA VERSIÓN MEJORADA PARA MÓVILES --- */
	@media (max-width: 767px) {
		.panel {
			/* Posicionamiento en la barra inferior */
			top: auto;
			bottom: 0;
			left: 0;
			width: 100%;
			border-radius: 12px 12px 0 0;
			box-sizing: border-box;

			/* Layout vertical, mucho más robusto */
			display: flex;
			flex-direction: column; /* Apila los elementos uno encima del otro */
			gap: 0.75rem; /* Espacio entre los elementos apilados */
			padding: 0.75rem 1rem;
		}

		h3 {
			/* Ocultamos el título "Controles" en móvil para ahorrar espacio */
			display: none;
		}
		
		/* Hacemos que el selector de escenario ocupe toda la primera fila */
		:global(.selector-container) {
			margin-top: 0;
			border-top: none;
			padding-top: 0;
		}
	}

    @media (min-width: 768px) and (max-width: 1024px) {
	    .panel {
		    /* Hacemos el panel un poco más pequeño en tablets */
		    width: 220px;
		    padding: 0.8rem;
	    }
	    h3 {
		    font-size: 1rem;
	    }

	    /* Hacemos que el texto del slider sea más pequeño */
	    :global(.slider-container label) {
		    font-size: 0.8em;
	    }
    }
    
</style>
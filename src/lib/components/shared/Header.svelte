<!-- src/lib/components/shared/Header.svelte -->
 <script lang="ts">
    import { page } from "$app/stores"; 
    import { base } from "$app/paths"; 
    import ThemeToggle from "./ThemeToggle.svelte";
    import LanguageSelector from "./LanguageSelector.svelte";
    import { _ } from "svelte-i18n"; 

    $: navSimulation = $_("nav.simulation") || "Simulation";
	$: navTheory = $_("nav.theory") || "Theory";
    $: navAbout = $_("nav.about") || "About"; 
</script>

 <header>
    <div class="title-and-nav">
        <h1>{$_("header.title")}</h1>
        <nav>
            <a href="{base}/" class:active={$page.url.pathname === base + "/"}>{navSimulation}</a>
            <a href="{base}/theory" class:active={$page.url.pathname === base + "/theory"}>{navTheory}</a>
            <a href="{base}/about" class:active={$page.url.pathname === base + "/about"}>{navAbout}</a>
        </nav>
    </div>

    <div class="controls">
        <LanguageSelector /> 
        <ThemeToggle />
    </div>
 </header>

 <style>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1.5rem;
        background-color: var(--header-bg);
        color: var(--header-text);
        height: 60px;
        border-bottom: 1px solid var(--header-border);
    }
    .title-and-nav {
		display: flex;
		align-items: center;
		gap: 2rem;
        font-family: Tahoma, sans-serif; 
	}
    h1 {
        font-size: 1.2rem;
        font-weight: 500;
    }
	nav {
		display: flex;
		gap: 1rem;
	}

	nav a {
		text-decoration: none;
		color: var(--text-secondary);
		padding: 0.5rem 0;
		border-bottom: 2px solid transparent;
		transition: all 0.2s;
	}

	nav a:hover {
		color: var(--text-primary);
	}

	nav a.active {
		color: var(--text-primary);
		border-bottom-color: var(--text-primary);
		font-weight: bold;
	}
    .controls {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    /* --- REGLAS PARA MÓVILES --- */
	@media (max-width: 767px) {
		header {
			/* Apilamos los elementos verticalmente */
			flex-direction: column;
			height: auto; /* La altura se ajustará al contenido */
			padding: 0.75rem;
			gap: 0.75rem;
		}

		.title-and-nav {
			/* También apilamos el título y la navegación */
			flex-direction: column;
			gap: 0.5rem;
			width: 100%;
			align-items: center; /* Centramos los elementos */
		}

		h1 {
			font-size: 1rem;
		}
	}
 </style>


<!-- src/routes/theory/+page.svelte -->
<script lang="ts">
    import { _ } from "svelte-i18n";
</script>

<div class="theory-container">
    <h1>{$_("theory.title")}</h1>

    <section>
        <h2>{$_("theory.biot_savart.title")}</h2>
        <p>{$_("theory.biot_savart.p1")}</p>
        <div class="formula">
            <p>d<b>B</b> = (μ₀ / 4π) * (I * d<b>l</b> x <b>r̂</b>) / r²</p>
        </div>
        <p>{$_("theory.biot_savart.p2")}</p>
    </section>

    <section>
        <h2>{$_("theory.ampere.title")}</h2>
        <p>{$_("theory.ampere.p1")}</p>
        <div class="formula">
            <p>∮ <b>B</b> ⋅ d<b>l</b> = μ₀ * I<sub>enc</sub></p>
        </div>
        <p>{$_("theory.ampere.p2")}</p>
    </section>
</div>

<style>
    .theory-container {
		max-width: 800px;
		margin: 2rem auto;
		padding: 1rem 2rem;
		background-color: var(--bg-secondary);
		border-radius: 8px;
		color: var(--text-primary);
		border: 1px solid var(--border-color);
		height: calc(100% - 6rem); /* 100% de la altura del main menos el padding vertical */
		overflow-y: auto; /* Permite scroll si el contenido es muy largo */
        /* font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; */
	}

	h1,
	h2 {
		border-bottom: 2px solid var(--border-color);
		padding-bottom: 0.5rem;
		margin-bottom: 1rem;
	}

	.formula {
		background-color: var(--bg-primary);
		padding: 1.5rem;
		margin: 1rem 0;
		border-radius: 4px;
		border: 1px solid var(--border-color);
		text-align: center;
		font-size: 1.2em;
		font-family: 'Times New Roman', serif;
	}
</style>